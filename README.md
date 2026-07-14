<div align="center">

# ⬡ Sato Hub MCP

**Query the scored, daily-updated index of the onchain agent stack — live, from your agent.**

Streamable HTTP · read-only · no API key

**[satohub.ai/mcp](https://satohub.ai/mcp?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents)** · **[the index](https://github.com/satohubai/onchain-agents)** · **[satohub.ai](https://satohub.ai?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents)**

</div>

---

## Endpoint

```
POST https://satohub.ai/api/mcp
```

Model Context Protocol over Streamable HTTP. 12 read-only tools over the Sato Hub directory (211+ scored resources), agent passports, deploy specs, news, and live metrics. Trust rules are enforced server-side: nothing is returned as verified/safe/profitable unless evidence supports it.

## Connect

**Claude Code**

```sh
claude mcp add --transport http satohub https://satohub.ai/api/mcp
```

**Claude Desktop / Cursor** (via `mcp-remote`)

```json
{
  "mcpServers": {
    "satohub": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://satohub.ai/api/mcp"]
    }
  }
}
```

**Any MCP client** — point it at the endpoint above; no auth handshake needed.

## Tools

| Tool | What it does |
|---|---|
| `onchain_agent_search_resources` | Search the index — text, category, chain filters |
| `onchain_agent_get_resource` | Full listing detail: Sato Score, liveness, provenance-backed fields |
| `onchain_agent_get_deploy_spec` | Docker-verified install/entry spec for a listing |
| `onchain_agent_list_categories` | Category vocabulary |
| `onchain_agent_list_chains` | Chain vocabulary |
| `onchain_agent_search_agents` | Search the Agent Passport registry |
| `onchain_agent_get_agent_passport` | One agent's passport: identity, wallet verification, on-chain checks |
| `onchain_agent_get_news` | The filtered onchain-agent news feed |
| `onchain_agent_get_metrics` | Live metrics (e.g. the ERC-8004 registered-agent count) |
| `onchain_agent_recent_changes` | The changelog feed — what changed in the index |
| `onchain_agent_list_wiki_pages` / `onchain_agent_get_wiki_page` | The wiki |

## Try it in 10 seconds

Ask your MCP-connected agent:

> "Search the Sato Hub index for Solana trading MCP servers with a Sato Score above 70, and give me the deploy spec for the best one."

No MCP client? The raw feed works anywhere:

```sh
curl -s https://satohub.ai/api/export/index.json | jq '.resources[] | select(.trust_score > 80) | .name'
```

## What the scores mean

The **Sato Score** is a 0–100 evidence-based measure of how *open, active, and verifiable* a project is — [methodology](https://satohub.ai/sato-score?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents). It is not a safety, quality, or returns grade, and the server will never tell your agent otherwise.

---

<sub>Maintained by [Sato Hub](https://satohub.ai?utm_source=github&utm_medium=mcp-repo&utm_campaign=onchain-agents) — the agent builder hub for crypto. Server implementation: `mcp-handler` on Next.js, read-only. MIT © Prime Signal LLC (this documentation); index data CC-BY-4.0, *data by satohub.ai*.</sub>
