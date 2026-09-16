#!/usr/bin/env node
// @satohub/mcp — stdio shim for the hosted Sato Hub MCP server.
//
// The real server is Streamable HTTP at https://satohub.ai/api/mcp (read-only,
// no auth). Clients that only speak stdio get here via `npx -y @satohub/mcp`;
// this spawns mcp-remote's proxy against that URL and forwards stdio.
// Extra argv is passed through to mcp-remote (e.g. --transport http-only).
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const ENDPOINT = process.env.SATOHUB_MCP_ENDPOINT || "https://satohub.ai/api/mcp";

const require = createRequire(import.meta.url);
let proxy;
try {
  // mcp-remote's package.json declares bin "mcp-remote": "dist/proxy.js".
  proxy = require.resolve("mcp-remote/dist/proxy.js");
} catch {
  process.stderr.write("@satohub/mcp: could not resolve mcp-remote/dist/proxy.js — reinstall the package.\n");
  process.exit(1);
}

const child = spawn(process.execPath, [proxy, ENDPOINT, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});

for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => { if (!child.killed) child.kill(sig); });
}
child.on("error", (err) => {
  process.stderr.write(`@satohub/mcp: failed to start mcp-remote: ${err.message}\n`);
  process.exit(1);
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
