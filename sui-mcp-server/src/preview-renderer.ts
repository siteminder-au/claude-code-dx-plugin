import fs from "fs";
export function wrapHtmlSnippet(jsxCode: string, title = "Preview") {
  return `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>${title}</title></head>
  <body>
    <div id="root"></div>
    <pre style="white-space:pre-wrap;background:#fff; padding:16px; border:1px solid #eee; font-family:monospace;">${escapeHtml(jsxCode)}</pre>
  </body>
</html>`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}