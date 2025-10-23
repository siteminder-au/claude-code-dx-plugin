# SUI Vue 3 MCP Server

Local Model Context Protocol (MCP) server and (optional) legacy HTTP server for discovering and interacting with Sui UI components. It parses all `.vue` files under your SUI component library, generates a `component-meta.json`, and exposes tools/endpoints for:

* Listing components
* Fetching rich component metadata (props, import path, children capability)
* Generating usage snippets
* Rendering HTML previews

---

## Run the MCP Server

```
npm run dev
```

the MCP server is ready to use. In claude code, type the following prompt to connect the MCP server

```
you have access to the mcp server at http://localhost:3333/mcp 

```

## 1. Generate the components meta (optional).

the meta (`component-meta.json`) already generated and included with the code.

### Prerequisite

| Requirement | Notes |
| ----------- | ----- |
| Node.js 18+ | Uses TypeScript + vue-docgen-api |
| Vue component repo | Typically cloned at `./libs/sui-core` or set via `COMP_REPO` env |

If your component library lives elsewhere, export `COMP_REPO` pointing to its `src/app/components` directory when generating meta.

---

## 2. Install Dependencies

```bash
cd sui-mcp-server
npm install
```

---

## 3. Generate Component Metadata (Required)

This produces `component-meta.json` consumed by both MCP tools and HTTP endpoints.

```bash
# Default (expects repo at ./libs/sui-core/src/app/components)
# open package.json and update generate-meta
# this command use an absolute path of the sui repo directory. Assuming you have already downloaded the sui repo.
# COMP_REPO=/Users/anamhossain/Siteminder/sui/libs/sui-core/src/app/components/
npm run generate-meta

Output example:

```
Saved component metadata to sui-mcp-server/component-meta.json
```

Re‑run whenever components change.

---

## 4. Run the MCP Server (Copilot Integration)

Runs over stdio implementing the Model Context Protocol.

### Available MCP Tools

| Tool | Purpose |
| ---- | ------- |
| `list_vue_components` | Enumerate components + quick props count |
| `get_component_meta` | Detailed props (type, required, default, description) |
| `generate_vue_snippet` | Produce a Vue usage snippet with supplied props |
| `render_vue_preview` | Wrap code in static HTML for preview |

### Copilot Chat Examples

```
@mcp list_vue_components
@mcp get_component_meta SmButton
@mcp generate_vue_snippet {"name":"SmButton","props":{"variant":"primary","size":"md"}}
@mcp render_vue_preview {"code":"<SmButton variant=\"primary\">Click</SmButton>"}
```

---

## 5. (Optional) Run Legacy HTTP Server

If you prefer HTTP endpoints (SSE included) for manual inspection:

```bash
npm run dev          # TypeScript with live reload
# or
npm run build && npm start   # Compile then run dist
```

Server default port: `3333` (override with `PORT=4000 npm run dev`).

Endpoints:

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | /mcp | Discovery JSON or SSE handshake (with `Accept: text/event-stream`) |
| POST | /mcp/initialize | Emits initialize event + JSON capabilities |
| GET | /mcp/health | Health + timestamp |
| GET | /mcp/listComponents | Component list (requires meta file) |
| GET | /mcp/getComponentMeta/:name | Single component meta lookup (case / kebab tolerant) |
| POST | /mcp/generateSnippet | Body: `{ name, props }` => snippet code |
| POST | /mcp/renderPreview | Body: `{ code }` => wrapped HTML |

Example:

```bash
curl http://localhost:3333/mcp/listComponents | jq
```

---

## 6. Updating Metadata Workflow

1. Edit or add Vue component files.
2. Re-run `npm run generate-meta`.
3. Restart MCP server (or just re-invoke tool; file is read per request).

Because meta is loaded fresh on each tool call / HTTP request, restart only needed if path structure changes drastically.

---

## 7. Development & Scripts

| Script | Purpose |
| ------ | ------- |
| `npm run generate-meta` | Produce/refresh `component-meta.json` |
| `npm run mcp` | Start MCP stdio server (Copilot) |
| `npm run dev` | Start legacy HTTP server with ts-node-dev |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled HTTP server from `dist` |
| `npm run mcp:build` | Build then run compiled MCP server from `dist` |

---

## 8. Meta File Structure (Excerpt)

```jsonc
{
   "SmButton": {
      "exportName": "SmButton",
      "path": "libs/sui-core/src/app/components/sm-button/SmButton.vue",
      "packageImport": "@siteminder/sui-core/components/SmButton",
      "props": {
         "variant": { "type": "string", "required": false, "description": "Visual style" }
      },
      "children": "node|string"
   }
}
```

---

## 10. Security / Safety Notes

Metadata generation parses source—avoid pointing `COMP_REPO` at untrusted code. No network calls are made beyond what you initiate (HTTP server is local only).

---

### TL;DR
1. `npm install`
2. `npm run generate-meta`
3. Run `npm run dev`
4. Open Claud code
5. Type the following prompt: `you have access to the mcp server at http://localhost:3333/mcp`