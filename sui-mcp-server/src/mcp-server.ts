#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { MetaManifest } from "./types";
import { generateSnippet } from "./snippet-generator";
import { wrapHtmlSnippet } from "./preview-renderer";

const META_FILE = path.resolve(__dirname, "..", "component-meta.json");

function loadMeta(): MetaManifest {
  if (!fs.existsSync(META_FILE)) return {};
  const raw = fs.readFileSync(META_FILE, "utf-8");
  return JSON.parse(raw) as MetaManifest;
}

const server = new Server(
  {
    name: "sui-vue3-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_vue_components",
        description: "List all available Vue 3 components with their metadata",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: "get_component_meta",
        description: "Get detailed metadata for a specific Vue component",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Component name (exact, lowercase, or kebab-case)",
            },
          },
          required: ["name"],
          additionalProperties: false,
        },
      },
      {
        name: "generate_vue_snippet",
        description: "Generate a Vue component snippet with specified props",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Component name",
            },
            props: {
              type: "object",
              description: "Props to include in the component (key-value pairs)",
              additionalProperties: true,
            },
          },
          required: ["name"],
          additionalProperties: false,
        },
      },
      {
        name: "render_vue_preview",
        description: "Wrap Vue code in HTML for preview rendering",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "Vue template/component code to wrap",
            },
            title: {
              type: "string",
              description: "Optional title for the preview",
              default: "Preview",
            },
          },
          required: ["code"],
          additionalProperties: false,
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_vue_components": {
        const meta = loadMeta();
        const components = Object.keys(meta).map((k) => ({
          name: k,
          exportName: meta[k].exportName,
          path: meta[k].path,
          packageImport: meta[k].packageImport,
          props: Object.keys(meta[k].props || {}),
          hasChildren: !!meta[k].children,
          propsCount: Object.keys(meta[k].props || {}).length,
        }));

        return {
          content: [
            {
              type: "text",
              text: `Found ${components.length} Vue components:\n\n${components
                .map(
                  (c) =>
                    `• **${c.name}** (${c.propsCount} props${
                      c.hasChildren ? ", accepts children" : ""
                    })\n  Import: \`${c.packageImport || c.path}\``
                )
                .join("\n\n")}`,
            },
          ],
        };
      }

      case "get_component_meta": {
        const { name } = args as { name: string };
        const meta = loadMeta();
        
        // Support multiple name formats
        const lookupCandidates = [
          name,
          name.toLowerCase(),
          name.replace(/([A-Z])/g, "-$1").toLowerCase(),
          name.replace(/[-_]/g, "").toLowerCase(),
        ];
        
        const foundKey = Object.keys(meta).find(
          (k) =>
            lookupCandidates.includes(k) ||
            lookupCandidates.includes(k.toLowerCase())
        );

        if (!foundKey) {
          return {
            content: [
              {
                type: "text",
                text: `Component "${name}" not found. Available components: ${Object.keys(
                  meta
                ).join(", ")}`,
              },
            ],
          };
        }

        const componentMeta = meta[foundKey];
        const propsText = Object.entries(componentMeta.props || {})
          .map(([propName, propInfo]) => {
            const required = propInfo.required ? " (required)" : "";
            const defaultVal = propInfo.defaultValue
              ? ` [default: ${propInfo.defaultValue}]`
              : "";
            return `• **${propName}**: ${propInfo.type}${required}${defaultVal}\n  ${
              propInfo.description || "No description"
            }`;
          })
          .join("\n\n");

        return {
          content: [
            {
              type: "text",
              text: `# ${componentMeta.exportName}\n\n**Import:** \`${
                componentMeta.packageImport || componentMeta.path
              }\`\n\n**Children:** ${
                componentMeta.children || "None"
              }\n\n## Props\n\n${propsText || "No props defined"}`,
            },
          ],
        };
      }

      case "generate_vue_snippet": {
        const { name, props = {} } = args as {
          name: string;
          props?: Record<string, any>;
        };
        const meta = loadMeta();

        if (!meta[name]) {
          return {
            content: [
              {
                type: "text",
                text: `Component "${name}" not found. Available: ${Object.keys(
                  meta
                ).join(", ")}`,
              },
            ],
          };
        }

        const code = generateSnippet(meta[name], props);

        return {
          content: [
            {
              type: "text",
              text: `Generated Vue snippet for ${name}:\n\n\`\`\`vue\n${code}\n\`\`\``,
            },
          ],
        };
      }

      case "render_vue_preview": {
        const { code, title = "Preview" } = args as {
          code: string;
          title?: string;
        };

        if (!code) {
          return {
            content: [
              {
                type: "text",
                text: "Error: No code provided for preview rendering",
              },
            ],
          };
        }

        const html = wrapHtmlSnippet(code, title);

        return {
          content: [
            {
              type: "text",
              text: `Preview HTML generated:\n\n\`\`\`html\n${html}\n\`\`\``,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing ${name}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Vue Component Server running on stdio");
}

runServer().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});