from pathlib import Path

# Define the updated SKILL.md content based on the current execute() behavior
updated_skill_md = """---
name: Siteminder DX MySQL Pipe
description: Create a local MySQL tunnel using Siteminder DX infrastructure mysql-pipe command.
---

# Siteminder DX MySQL Pipe

## Instructions

- This skill creates a local MySQL tunnel to a remote host using `dx-mysql-pipe.js`.
- Required input:
  - `host` — the remote MySQL host (e.g., `platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com`)
- Optional inputs:
  - `port` — local port to bind the tunnel (if omitted, a free port is automatically selected)
  - `extraArgs` — optional extra arguments for the DX command (e.g., `--verbose true`)
  - `detach` — boolean; if true (default), tunnel runs as a background process
- **Interactive prompts**:
  - If `host` or `port` is missing and the script runs in a terminal, the plugin prompts the user:
    ```
    Enter MySQL host:
    Enter local port (leave blank to auto-pick):
    ```
- The plugin should be invoked programmatically by Claude via:
```javascript
execute({ tool_name: 'mysql_pipe', tool_input: { host: '<host>', port: <port>, extraArgs: '...', detach: true } })
```

Once inputs are provided, the plugin:

Starts a background tunnel process (if detach: true)

Returns a structured response with:

usedLocalPort — the local port bound

pid — process ID (if detached)

logPath — path to the log file

message — confirmation and connection info

To stop a tunnel, use the stop_tunnel tool:

```
execute({ tool_name: 'stop_tunnel', tool_input: { pid: <pid> } })
```

or

```
execute({ tool_name: 'stop_tunnel', tool_input: { port: <port> } })
```

Always confirm with the user before starting a tunnel.

Display tunnel connection details (127.0.0.1:<usedLocalPort>) and log location once started.

Examples:

Example 1: Start tunnel (programmatic, auto port)

User request:

```
"Connect to platform-dev database"
```

Programmatic call:

```
execute({
  tool_name: 'mysql_pipe',
  tool_input: {
    host: 'platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com'
  }
});
```

Result returned:


✅ Tunnel established
Host: platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com
Local: 127.0.0.1:13277
PID: 32452
Logs: ./dx-mysql-pipe-logs/dx-mysql-pipe_platform-dev_13277.log

Example 2: Start tunnel with port specified

```
execute({
  tool_name: 'mysql_pipe',
  tool_input: {
    host: 'platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com',
    port: 13305
  }
});
```

Result:

```
✅ Tunnel established
Host: platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com
Local: 127.0.0.1:13305
PID: 32453
Logs: ./dx-mysql-pipe-logs/dx-mysql-pipe_platform-dev_13305.log
```

Example 3: Stop tunnel by PID

```
execute({
  tool_name: 'stop_tunnel',
  tool_input: { pid: 32452 }
});
```

Result:

```
🛑 Tunnel process (PID 32452) stopped successfully.
```

Example 4: Stop tunnel by Port

```
execute({
  tool_name: 'stop_tunnel',
  tool_input: { port: 13305 }
});
```

Result:

```
🛑 Tunnel process on port 13305 stopped successfully.
```

Notes

CLI arguments (--host / --port) are not supported; the plugin works via programmatic execute() calls or interactive prompts.

Interactive prompts appear only when host or port are missing and stdin is available.

Returned data always includes:

usedLocalPort, pid, logPath, and message.

Logs are stored in ./dx-mysql-pipe-logs/.

Track pid or usedLocalPort to stop tunnels correctly.
"""