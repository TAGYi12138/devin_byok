"use strict";

const ACP_ENABLED_KEYS = ["devin.acp.enabledAgents", "windsurf.acp.enabledAgents"];

function distributionKind(agent) {
  const distribution = agent && agent.distribution;
  if (!distribution || typeof distribution !== "object") return "none";
  for (const kind of ["websocket", "binary", "npx", "uvx"]) {
    if (distribution[kind]) return kind;
  }
  return "unknown";
}

function registryChangeRequiresReload(change) {
  if (!change || typeof change !== "object") return false;
  if (Array.isArray(change.added) && change.added.includes("devin-cli")) return true;
  return Array.isArray(change.transportChanges) && change.transportChanges.some(item =>
    item && item.id === "devin-cli" && item.from !== item.to
  );
}

function isAcpLocalAgentEnabled(vscode) {
  let registeredKeySeen = false;
  let explicitEnableSeen = false;
  for (const key of ACP_ENABLED_KEYS) {
    try {
      const inspected = vscode.workspace.getConfiguration().inspect(key);
      if (!inspected || inspected.defaultValue === undefined) continue;
      registeredKeySeen = true;
      const value = vscode.workspace.getConfiguration().get(key);
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (value["devin-cli"] === false) return false;
        if (value["devin-cli"] === true) explicitEnableSeen = true;
      }
    } catch {}
  }
  return registeredKeySeen && explicitEnableSeen;
}

function isAcpLocalAgentExplicitlyDisabled(vscode) {
  for (const key of ACP_ENABLED_KEYS) {
    try {
      const inspected = vscode.workspace.getConfiguration().inspect(key);
      if (!inspected || inspected.defaultValue === undefined) continue;
      const value = vscode.workspace.getConfiguration().get(key);
      if (value && typeof value === "object" && !Array.isArray(value) && value["devin-cli"] === false) {
        return true;
      }
    } catch {}
  }
  return false;
}

module.exports = {
  ACP_ENABLED_KEYS,
  distributionKind,
  registryChangeRequiresReload,
  isAcpLocalAgentEnabled,
  isAcpLocalAgentExplicitlyDisabled
};
