# SUI MCP Demo (Vue 3 + Vite)

<p align="center">
	<img src="./src/assets/hero-image.png" alt="SUI MCP Demo Hero" />
</p>

This demo app shows how you can use the SUI Model Context Protocol (MCP) server to accelerate UI development by asking an AI assistant (Claude Code) to understand existing components, generate snippets, and refactor pages.

---

## 1. Install & Run the Demo App

```bash
npm install
npm run dev
```

App runs (default) at: http://localhost:5173

---

## 2. Run the SUI MCP Server

Open a second terminal in a new tab or window. In terminal go to the `sui-mcp-server` and run it via `npm run dev`.

```bash
cd ../sui-mcp-server
npm install   # first time only
npm run dev   # starts HTTP + SSE server at http://localhost:3333
```

## 3. Use MCP server via Claude code
Open the claude code in terminal by typing `claude` (or another MCP‑aware chat). Once claude code is running:

1. Ask Claude to use the SUI MCP server running locally. This is done in step 2.

```
you have access to the mcp server at http://localhost:3333/mcp
```
2. Let the claude know what are the available components

```
# in claude code
# test the mcp server and let the AI know the all available components

curl -X POST http://localhost:3333/mcp/initialize

OR:

curl http://localhost:3333/mcp/listComponents | jq
```

#### Check the available components and generate a snippet (Optional)
Once connected you can ask for higher‑level changes. The assistant will typically:

In claude code: 

1. List available components (`/mcp/listComponents` under the hood)
2. Fetch detailed meta for specific ones (`/mcp/getComponentMeta/:name`)
3. Generate code snippets (`/mcp/generateSnippet`)
4. Insert or refactor Vue SFCs in `src/components` or pages in `src`.

---

## 3. Run a prompt to generate the UI based on sui components

```
Update the home page to showcase the SUI MCP Server. use sui card, button and other components and generate a responsive card section with: (a) a headline describing what the SUI MCP server does, (b) bullet points of benefits (faster discovery, automated snippet generation, consistent imports), (c) buttons that link to documentation placeholders. Use free online placeholder images (unsplash) in the cards. Keep styling consistent with existing components if available.
```

## Example Prompts

Try pasting (or adapting) these after connection:

1. Update the home page:
	> Update the home page to showcase the SUI MCP Server. use sui card, button and other components and generate a responsive card section with: (a) a headline describing what the SUI MCP server does, (b) bullet points of benefits (faster discovery, automated snippet generation, consistent imports), (c) buttons that link to documentation placeholders. Use free online placeholder images (unsplash) in the cards. Keep styling consistent with existing components if available.

2. Create a buttons gallery page:
	> Create a new page `ButtonsGallery.vue` that lists every available button component from the SUI library. For each button show: variant name, a live example instance, and the snippet used to render it. Add a short intro paragraph at the top. Route it via the app's router and add a navigation link.

3. Discover components:
	> List all registered SUI components you can see along with how many props each has. Then suggest three high‑impact UI improvements for the home page using them.

4. Generate a specific snippet:
	> Generate a Vue snippet for `SmButton` with variant="primary" size="md" and label "Get Started" wrapped in a simple flex container.

5. Preview code (if using MCP preview tool):
	> Render a preview for a card layout with three `SmButton` components in different variants.

Feel free to iterate: ask the assistant to refine accessibility, add ARIA labels, extract repeated UI into smaller components, etc.
