# claude-code-dx-plugin

## Setup

### Install and configure Claude Code
1. `npm install -g @anthropic-ai/claude-code`
2. `code ~/.claude/settings.json`  or vim etc
```
  {
  "apiKeyHelper": "~/.claude/anthropic_key.sh"
  }
```
3. `code ~/.claude/anthropic_key.sh`  or vim etc.
4. echo "<put the claude api key value between quotation marks>"
5. `chmod +x ~/.claude/anthropic_key.sh`

### add and install this plugin to claude code
1. `mkdir -p ~/.claude/plugins/dev-marketplace/.claude-plugin`
2. vim ~/.claude/plugins/dev-marketplace/.claude-plugin/marketplace.json
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
      "description": "claude code tool to run npx @siteminder/dx commands"
    }
  ]
}
```
3. run `./copy-to-local.sh` to copy the plugin to the local directory.
4. start claude code
5. in claude run `/plugin marketplace add ./dev-marketplace`
6. once successfully added. then run `/plugin install siteminder-dx@dev-marketplace`

### To Setup Atlassian MCP
1. `claude mcp add --scope user --transport sse atlassian https://mcp.atlassian.com/v1/sse`
2. `claude mcp list` - If not authenticated
  - a. Run `claude`
  - b. Run `/mcp` and follow prompts to authenticate atlassian
    - i. Choose `siteminder.atlassian.net` (Confluence Access)