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
4. echo "your claude api key"
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
5. in claude run `/plugin marketplace add ~/.claude/plugins/dev-marketplace`
  - make sure you have plugins directory in your .claude directory.
6. once successfully added. then run `/plugin install siteminder-dx@dev-marketplace`

### To Setup Atlassian MCP
1. `claude mcp add --scope user --transport sse atlassian https://mcp.atlassian.com/v1/sse`
2. `claude mcp list` - If not authenticated
  - a. Run `claude`
  - b. Run `/mcp` and follow prompts to authenticate atlassian
    - i. Choose `siteminder.atlassian.net` (Confluence Access)

### To Setup Buildkite MCP (Readonly)
1. `claude mcp add --scope user --transport http buildkite-read-only-toolsets https://mcp.buildkite.com/mcp/readonly --header "X-Buildkite-Toolsets: user,pipelines,builds"`
2. `claude mcp list` - If not authenticated
  - a. Run `claude`
  - b. Run `/mcp` and follow prompts to authenticate buildkite


## MCP for SUI Vue 3

[SUI Vue 3 MCP](https://github.com/siteminder-au/claude-code-sui-mcp)

* Exposes SUI components metadata via MCP Server
* Reduces manual UI development effort with SUI
* Lets AI generate designs from natural language (e.g. "Generate an upsell page using SUI components")

## DX Plugin Usage

#### List all available Skills
- enter claude
- ask claude to `List all available Skills` or `What Skills are available?`

#### for dx tunnel
- once you enter to claude code, you can use the following command to open a tunnel to a remote host.
- user can run `open tunnel to <target_host>` to open a tunnel to a remote host.
example:
```
open tunnel to demand-manager-api.platform-dev
```
- user can run `stop tunnel <nickname>` to stop a tunnel.
example:
```
stop tunnel platform-dev-dm-api
```

- also claude code will asking to provide a nickname for the tunnel, for nexttime you can call nickname to open the tunnel.
example:
```
open tunnel to platform-dev-dm-api
```

#### for dx deploy
- enter to claude code, and ask user to provide the following details:
- `deploy <system> <component> <region(optional)> to <environment>`
- claude code will asking to provide workspace, <workspace> is root folder(provide the full path) of all projects in your local machine.
- claude code will remember the workspace for future use.
example:
```
(please) deploy tbb-google pricing-birdge apac to platform-dev
```

#### for dx approve
- enter claude
- type `approve all for {{ tagged buildkite link }}`
- will show a list of all the pending approval builds
- type `yes/approve` to final confirm

#### for dx list
- enter claude
- type `dx list`, this will show a list of all the `list command` options in dx
- select the one you wanna run
- add required options as the claude suggests
