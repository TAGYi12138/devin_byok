param([string]$StagePath = "", [string]$OutputPath = "")
# Build VSIX without vsce; explicit staging paths keep concurrent builds separate.
$ErrorActionPreference = "Stop"

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$stage = if ($StagePath) { [System.IO.Path]::GetFullPath($StagePath) } else { Join-Path $root "stage" }
if ($StagePath) {
  $allowedStageParent = [System.IO.Path]::GetFullPath((Join-Path $root "local-builds"))
  if ((Split-Path -Parent $stage) -ne $allowedStageParent -or !(Split-Path -Leaf $stage).StartsWith("release-")) { throw "Custom stage must be a release-* directory under local-builds" }
  if (Test-Path -LiteralPath $stage) { throw "Custom stage already exists; refusing to overwrite: $stage" }
}
$packageText = Get-Content -LiteralPath (Join-Path $root "extension\package.json") -Raw
$versionMatch = [regex]::Match($packageText, '"version"\s*:\s*"([^"]+)"')
if (!$versionMatch.Success) {
  throw "Cannot read extension version from package.json"
}
$version = $versionMatch.Groups[1].Value
$out = if ($OutputPath) { [System.IO.Path]::GetFullPath($OutputPath) } else { Join-Path $root ("devin-byok-bridge-" + $version + ".vsix") }

# Validate the package contract before staging. A VSIX can be accepted by the
# host while still failing activation when package.json points at a missing
# main file (as happened with a8-devin-byok.vsix). Keep the manifest and
# package versions in lock-step as well.
$mainMatch = [regex]::Match($packageText, '"main"\s*:\s*"([^"]+)"')
if (!$mainMatch.Success) { throw "Cannot read extension main from package.json" }
$mainRelative = $mainMatch.Groups[1].Value -replace '/', '\\'
$mainPath = Join-Path $root ("extension\\" + $mainRelative.TrimStart('\\'))
if (!(Test-Path -LiteralPath $mainPath -PathType Leaf)) {
  throw "Extension main file is missing: $mainRelative"
}
$sharpPath = Join-Path $root "extension\node_modules\sharp"
if (!(Test-Path -LiteralPath $sharpPath -PathType Container)) {
  throw "Runtime image codec is missing. Run npm install --omit=dev in extension before packaging."
}
$sharpProbe = & node -e "require(process.argv[1])" $sharpPath 2>&1
if ($LASTEXITCODE -ne 0) { throw "Runtime image codec cannot load: $sharpProbe" }
$manifestPath = Join-Path $root "packaging\\extension.vsixmanifest"
$manifestText = Get-Content -LiteralPath $manifestPath -Raw
$manifestVersion = [regex]::Match($manifestText, 'Identity[^>]*Version="([^"]+)"').Groups[1].Value
if (!$manifestVersion -or $manifestVersion -ne $version) {
  throw "VSIX manifest version ($manifestVersion) does not match package version ($version)"
}

if (Test-Path $stage) {
  $resolvedStage = (Resolve-Path -LiteralPath $stage).Path
  $expectedStage = [System.IO.Path]::GetFullPath((Join-Path $root "stage"))
  if ($resolvedStage -ne $expectedStage -or (Split-Path -Parent $resolvedStage) -ne (Resolve-Path -LiteralPath $root).Path) {
    throw "Unsafe staging cleanup target: $resolvedStage"
  }
  Remove-Item -LiteralPath $stage -Recurse -Force
}
New-Item -ItemType Directory -Path $stage | Out-Null

Copy-Item -LiteralPath (Join-Path $root "packaging\[Content_Types].xml") $stage
Copy-Item -LiteralPath (Join-Path $root "packaging\extension.vsixmanifest") $stage
Copy-Item -LiteralPath (Join-Path $root "extension") (Join-Path $stage "extension") -Recurse
# Local releases keep the native image codec bundled and require no asset host.

if (!(Test-Path -LiteralPath (Join-Path $stage ("extension\\" + $mainRelative)) -PathType Leaf)) {
  throw "Staged extension main file is missing: $mainRelative"
}

if (Test-Path $out) {
  Remove-Item -LiteralPath $out -Force
}

Add-Type -AssemblyName System.IO.Compression
$outStream = [System.IO.File]::Open($out, [System.IO.FileMode]::CreateNew)
$archive = New-Object System.IO.Compression.ZipArchive($outStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
$stagePrefix = (Resolve-Path -LiteralPath $stage).Path.TrimEnd('\') + '\'
try {
  Get-ChildItem -LiteralPath $stage -Recurse -File | ForEach-Object {
    $entryName = $_.FullName.Substring($stagePrefix.Length).Replace('\', '/')
    $entry = $archive.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $inputStream = [System.IO.File]::OpenRead($_.FullName)
    try {
      $inputStream.CopyTo($entryStream)
    } finally {
      $inputStream.Dispose()
      $entryStream.Dispose()
    }
  }
} finally {
  $archive.Dispose()
  $outStream.Dispose()
}

Write-Host "已生成: $out"
