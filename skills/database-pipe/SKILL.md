---
name: dx mysql pipe
description: Establish a local MySQL pipe to a remote database host using the dx infrastructure mysql-pipe command.
---

# Siteminder DX MySQL Pipe

This skill creates a local forward (port tunnel) to a remote MySQL database using `dx infrastructure mysql-pipe`. It returns the local host/port you can connect your MySQL client to while securely tunneling traffic to the specified remote RDS/Aurora host.

## Parameters
- <remote_host> (target_database_host): The remote MySQL hostname, e.g. `platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com`
- <local_port> (local_forward_port): A chosen available local TCP port (e.g. `13305`). If omitted, an open port can be auto-selected by tooling (plugin behavior).

## Behavior
1. Validates that a remote host is provided.
2. Uses the dx CLI to start a long-running pipe proces, make it as a background process, should not block claude code main process.
3. asking user to provide <local_port>. If no port is provided, then use a default port between 7000 to 7999, make sure the port is not in use in any other background process.
4. asking user to provide a nickname for the pipe, remember it for future use, can provide a short nickname for user choose.
5. User can terminate the pipe process by asking to stop the process.

## Command Template
```bash
dx infrastructure mysql-pipe -h <remote_host> -p <local_port>
```

## Example
user request:
- "open db pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
- "mysql pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
- "pipe to platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com"
meaning:
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

