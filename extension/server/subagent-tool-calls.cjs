"use strict";

// Devin treats any supplied `resume` value as an existing subagent ID. Some
// upstream models fill optional fields with an empty string or "new" when
// creating a subagent; omit only those placeholders for a new profile call.
function normalizeArguments(name, argumentsJson) {
  if (name !== "run_subagent" || typeof argumentsJson !== "string") return argumentsJson;
  let args;
  try { args = JSON.parse(argumentsJson); }
  catch { return argumentsJson; }
  if (!args || typeof args !== "object" || Array.isArray(args)) return argumentsJson;
  if (typeof args.profile !== "string" || !args.profile.trim()) return argumentsJson;
  if (typeof args.resume !== "string" || !["", "new"].includes(args.resume.trim().toLowerCase())) return argumentsJson;
  delete args.resume;
  return JSON.stringify(args);
}

module.exports = { normalizeArguments };
