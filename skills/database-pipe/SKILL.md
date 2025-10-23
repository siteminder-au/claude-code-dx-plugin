---
name: dx mysql pipe
description: Establish a local MySQL pipe to a remote database host using the dx infrastructure mysql-pipe command.
---

# Siteminder DX MySQL Pipe

This skill creates a local forward (port tunnel) to a remote MySQL database using `dx infrastructure mysql-pipe`. It returns the local host/port you can connect your MySQL client to while securely tunneling traffic to the specified remote RDS/Aurora host.

## Parameters
- <remote_host> (target_database_host): The remote MySQL hostname, e.g. `platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com`
- <nickname> (remote_host_nickname): A nickname for the remote host, e.g. `platform-dev-ppay`.
- <local_port> (local_forward_port): A chosen available local TCP port (e.g. `13305`). If omitted, an open port can be auto-selected by tooling (plugin behavior).

## Behavior
- Validates <remote_host> or <nickname> is provided.
- asking user to provide <local_port>. If no port is provided, then use a default port between 7000 to 7999, make sure the port is not in use in any other background process.
- if user provide a nickname at <remote_host>, then don't ask user to provide <nickname> again, and use the <nickname> to get the real <remote_host> then use in the command.
- asking user to provide a <nickname> for the <remote_host> and remember it in cache and for future use.
- provide a short nickname for user choose in option.
- dx command is available in the global node_modules folder, add it to the path before executing dx-tunnel.js.
- if user dosn't have dx installed in global, use `npx @siteminder/dx` to execute the command instead of `dx`.
- show the command will be executed to the user for approval.
- execute the command as a background process, should not block claude code main process.
- User can terminate the pipe process by asking to stop the process.

## Command Template

#### with dx command installed in global:
```bash
dx infrastructure mysql-pipe -h <remote_host> -p <local_port>
```
#### with npx @siteminder/dx installed in global:
```bash
npx @siteminder/dx infrastructure mysql-pipe -h <remote_host> -p <local_port>
```

## Example
user request:
- "open db pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
- "mysql pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
- "pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
- above examples all mean the same thing:
- <remote_host> is platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com
- <local_port> is not provided, then use a default port between 7000 to 7999, make sure the port is not in use in any other background process.

```bash
dx infrastructure mysql-pipe -h platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com -p 13305
```

## Usage Guidance
- Pick a local port that is not already in use (commonly > 1024). If unsure, allow auto-selection or test availability.
- Multiple pipes can run concurrently if each uses a unique local port.
- After establishing the pipe, configure your MySQL client to connect to `127.0.0.1` with the forwarded port and standard credentials for the remote DB.
- Stop the session to tear down the tunnel.

## Troubleshooting
- Port already in use: choose another port (e.g. increment by 1).
- Permission errors: ensure `dx` CLI is installed and in PATH.
- Host unreachable: verify VPN or network access to the target infrastructure.

