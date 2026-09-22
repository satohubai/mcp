<div align="center">

# ⬡ Sato Hub MCP

**Query the scored, daily-updated index of the onchain agent stack — live, from your agent.**

`npx -y @satohub/mcp` · Streamable HTTP · 32 tools · four can change Sato Hub state · no API key

[![npm](https://img.shields.io/npm/v/%40satohub%2Fmcp?label=%40satohub%2Fmcp&color=0b0f14)](https://www.npmjs.com/package/@satohub/mcp)
[![license](https://img.shields.io/badge/license-MIT-0b0f14)](./LICENSE)

**[satohub.ai/mcp](https://satohub.ai/mcp?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents)** · **[the index](https://github.com/satohubai/onchain-agents)** · **[framework plugins](https://github.com/satohubai/sato-hub-integrations)** · **[satohub.ai](https://satohub.ai?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents)**

</div>

---

- **What this is.** The Sato Hub MCP server: 32 tools over the scored index of what onchain agents are built from (frameworks, MCP servers, wallets, x402 and stablecoin payment rails, ERC-8004 identity, trading venues, agent skills), plus measured agent-economy numbers, Agent Passports, Preflight and Sato Route. This repo holds `@satohub/mcp`, the stdio shim for clients that cannot speak HTTP.
- **What a Sato Score is.** A 0–100 measure of how **open, active and verifiable** a project is, computed from evidence only. It is **not** a safety, quality, security or returns grade, and self-reported is never treated as verified. [Methodology →](https://satohub.ai/sato-score?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents)
- **Non-custodial.** Nothing here signs a transaction, holds a key or moves funds. Route and swap tools return unsigned objects for your own signer, and every refusal names its rule.

## Endpoint

```
POST https://satohub.ai/api/mcp
```

Model Context Protocol over Streamable HTTP. If your client speaks HTTP, use this URL directly and skip the package.

## Connect

**Claude Code**

```sh
claude mcp add --transport http satohub https://satohub.ai/api/mcp
```

**Claude Desktop** (`claude_desktop_config.json`) · **Cursor** (`.cursor/mcp.json`) · **Windsurf** (`mcp_config.json`)

```json
{
  "mcpServers": {
    "satohub": { "command": "npx", "args": ["-y", "@satohub/mcp"] }
  }
}
```

**VS Code, Codex, any Streamable HTTP client**

```json
{ "mcpServers": { "satohub": { "type": "http", "url": "https://satohub.ai/api/mcp" } } }
```

The shim wraps [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) against the hosted endpoint. Extra arguments are forwarded to it; `SATOHUB_MCP_ENDPOINT` overrides the endpoint.

## The 32 tools

All names are prefixed `onchain_agent_`.

| Layer | Tools |
|---|---|
| **Find and judge** | `search_resources` · `get_resource` · `compare_listings` · `recommend_stack` · `get_deploy_spec` · `get_score_methodology` · `get_listing_history` |
| **Check before you act** | `preflight` · `watch` ▲ |
| **Route** (quotes, unsigned) | `route_swap` · `swap` ▲ · `route_agent` · `route_launch` · `route_lp` |
| **Build** | `build_plan` · `scaffold_plan` |
| **Agent economy & numbers** | `get_agent_economy` · `get_trend` · `explain_number` · `get_metrics` |
| **Agents & skills** | `search_agents` · `get_agent_passport` · `search_skills` |
| **Stay current** | `recent_changes` · `get_changes` · `get_news` |
| **Reference** | `list_categories` · `list_chains` · `list_wiki_pages` · `get_wiki_page` |
| **File** | `submit_project` ▲ · `register_agent` ▲ — a submission or a self-reported registration, never a listing and never a verification |

▲ Twenty-eight tools are read-only. Four can change Sato Hub state: `watch` creates a monitor, `submit_project` queues a submission, `register_agent` creates or pends a self-reported passport, and `swap` in `build-tx` mode records a receipt for an unsigned transaction. None signs, holds or broadcasts funds.

Every record carries `sato_url` (its canonical page) and, where scored, `verify_url` (the Sato Score report). Cite the `sato_url` when you surface a record so the reader can check its current state. Preflight verdicts and route decisions leave the server with a detached Ed25519 signature — [the scheme](https://satohub.ai/.well-known/sato-signing.json).

## Try it in 10 seconds

Ask your MCP-connected agent:

> "Search the Sato Hub index for Solana trading MCP servers with a Sato Score above 70, run Preflight on the top one, and give me its deploy spec."

No MCP client? The raw feed works anywhere:

```sh
curl -s https://satohub.ai/api/export/index.json | jq '.resources[] | select(.trust_score > 80) | .name'
```

## What the numbers mean

`verification_status` separates self-reported from verified. In agent-economy data `null` means unknown, never zero, and rows are never summed across venues, chains or stages. A Preflight `unknown` is a refusal to guess, not a pass.

---

<sub>Maintained by [Sato Hub](https://satohub.ai?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents) — the agent builder hub for crypto. Server: `mcp-handler` on Next.js. MIT © Sato Hub (this package and documentation); index data CC-BY-4.0, *data by satohub.ai*.</sub>
