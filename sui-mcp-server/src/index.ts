import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { MetaManifest } from "./types";
import { generateSnippet } from "./snippet-generator";
import { wrapHtmlSnippet } from "./preview-renderer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

type SseClient = { id: number; res: Response };
const sseClients: SseClient[] = [];
let sseClientId = 1;

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;
const META_FILE = path.resolve(__dirname, "..", "component-meta.json");

function loadMeta(): MetaManifest {
  if (!fs.existsSync(META_FILE)) return {};
  const raw = fs.readFileSync(META_FILE, "utf-8");
  return JSON.parse(raw) as MetaManifest;
}

app.get("/mcp", (req: Request, res: Response) => {
  const accept = String(req.headers.accept || "");
  if (accept.includes("text/event-stream")) {
    // SSE handshake
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const client: SseClient = { id: sseClientId++, res };
    sseClients.push(client);

    // initial messages
    res.write(`: connected\n\n`);
    res.write(`event: ready\ndata: ${JSON.stringify({ message: "mcp sse connected" })}\n\n`);

    // keepalive
    const keepAlive = setInterval(() => {
      try { res.write(`: ping\n\n`); } catch (e) {}
    }, 15000);

    req.on("close", () => {
      clearInterval(keepAlive);
      const idx = sseClients.findIndex(c => c.id === client.id);
      if (idx >= 0) sseClients.splice(idx, 1);
    });
    return;
  }

  // Standard HTTP discovery response
  res.json({
    ok: true,
    name: "sui-vue3-mcp",
    version: "1.0.0",
    endpoints: {
      list: "/mcp/listComponents",
      meta: "/mcp/getComponentMeta/:name",
      generate: "/mcp/generateSnippet",
      preview: "/mcp/renderPreview",
      initialize: "/mcp/initialize"
    }
  });
});

// POST /mcp/initialize - return init JSON and push to SSE clients if connected
app.post("/mcp/initialize", (req: Request, res: Response) => {
  const initResponse = {
    ok: true,
    id: "sui-vue3-mcp",
    capabilities: {
      listComponents: true,
      getComponentMeta: true,
      generateSnippet: true,
      renderPreview: true
    }
  };

  const payload = JSON.stringify(initResponse);
  sseClients.forEach(c => {
    try {
      c.res.write(`event: initialize\n`);
      c.res.write(`data: ${payload}\n\n`);
    } catch (e) {
      // ignore
    }
  });

  return res.json(initResponse);
});

app.get("/mcp/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/mcp/listComponents", (req, res) => {
  const meta = loadMeta();
  const items = Object.keys(meta).map((k) => ({ name: k, exportName: meta[k].exportName, path: meta[k].path, props: Object.keys(meta[k].props || {}) }));
  res.json({ ok: true, components: items });
});

app.get("/mcp/getComponentMeta/:name", (req, res) => {
  const meta = loadMeta();
  const name = req.params.name;
  // accept exact, lowercase, and dash/kebab variants
  const lookupCandidates = [
    name,
    name.toLowerCase(),
    name.replace(/([A-Z])/g, "-$1").toLowerCase(), // PascalCase -> kebab-case
    name.replace(/[-_]/g, "").toLowerCase() // strip separators
  ];
  const foundKey = Object.keys(meta).find(k => lookupCandidates.includes(k) || lookupCandidates.includes(k.toLowerCase()));
  if (!foundKey) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true, meta: meta[foundKey] });
});

app.post("/mcp/generateSnippet", (req, res) => {
  const { name, props = {} } = req.body;
  const meta = loadMeta();
  if (!meta[name]) return res.status(404).json({ ok: false, error: "Not found" });
  const code = generateSnippet(meta[name], props);
  res.json({ ok: true, code });
});

app.post("/mcp/renderPreview", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ ok: false, error: "no code" });
  const html = wrapHtmlSnippet(code);
  res.json({ ok: true, html });
});

app.listen(PORT, () => {
  console.log(`MCP server listening on http://localhost:${PORT}`);
});