param([Parameter(Mandatory=$true)][string]$StagePath,[Parameter(Mandatory=$true)][string]$OutputPath)
$ErrorActionPreference = 'Stop'
$resolvedStage = (Resolve-Path -LiteralPath $StagePath).Path
if (Test-Path -LiteralPath $OutputPath) { throw 'Output already exists; refusing to overwrite' }
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
$outputStream = [IO.File]::Open($OutputPath,[IO.FileMode]::CreateNew)
$archive = [IO.Compression.ZipArchive]::new($outputStream,[IO.Compression.ZipArchiveMode]::Create,$false)
try {
  Get-ChildItem -LiteralPath $resolvedStage -Recurse -File -Name | ForEach-Object {
    $relative = $_.Replace([char]92,[char]47)
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive,(Join-Path $resolvedStage $_),$relative,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $archive.Dispose(); $outputStream.Dispose() }
