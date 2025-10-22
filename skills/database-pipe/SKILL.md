---
name: MySQL Pipe Connection
description: Establish a local MySQL pipe to a remote database host using the dx infrastructure mysql-pipe command.
---

# Siteminder DX MySQL Pipe

This skill creates a local forward (port tunnel) to a remote MySQL database using `dx infrastructure mysql-pipe`. It returns the local host/port you can connect your MySQL client to while securely tunneling traffic to the specified remote RDS/Aurora host.

## Parameters
- host (target_database_host): The remote MySQL hostname, e.g. `platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com`
- port (local_forward_port): A chosen available local TCP port (e.g. `13305`). If omitted, an open port can be auto-selected by tooling (plugin behavior).

## Behavior
1. Validates that a remote host is provided.
2. Uses the dx CLI to start a long-running pipe process.
3. Exposes a local endpoint: `mysql://127.0.0.1:<port>`.
4. User can terminate the pipe (Ctrl+C) when finished.

## Command Template
```bash
dx infrastructure mysql-pipe -h <remote_host> -p <local_port>
```

## Example
Connect to a remote dev Payments database and forward locally on port 13305:
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

