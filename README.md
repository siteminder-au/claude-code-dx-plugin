# claude-code-dx-plugin
## To Setup
1. `npm install -g @anthropic-ai/claude-code`
2. `code ~/.claude/settings.json`  or vim etc
```
  {
  "apiKeyHelper": "~/.claude/anthropic_key.sh"
  }
```
3. `code ~/.claude/anthropic_key.sh`  or vim etc.
4. echo "<put the claude api key value between quotation marks>"
5. mkdir -p ~/.claude/plugins/dev-marketplace/.claude-plugin
6. vim ~/.claude/plugins/dev-marketplace/.claude-plugin/marketplace.json
```
{
  "name": "dev-marketplace",
  "owner": {
    "name": "Developer"
  },
  "plugins": [
    {
      "name": "siteminder-dx",
      "source": "./siteminder-dx",
      "description": "Plugin under development"
    }
  ]
}
```
7. `claude mcp add --scope user --transport sse atlassian https://mcp.atlassian.com/v1/sse`
8. `claude mcp list` - If not authenticated
  - a. Run `claude`
  - b. Run `/mcp` and follow prompts to authenticate atlassian
    - i. Choose `siteminder.atlassian.net` (Confluence Access)