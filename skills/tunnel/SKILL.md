---
name: dx tunnel
description: open a tunnel to remote host using dx command, and provide a nickname for the tunnel for future use, for example "open tunnel to demand-manager-api.platform-dev".
---

# dx tunnel

## Instructions
- required arguments: target_host, target_port, local_port
  - <target_host> is the host to open the tunnel to, example: demand-manager-api.platform-dev
  - <target_port> is the target host port, default value is 80.
  - <local_port> is the port to open in local machine, default value pick between 8000 to 8999, make sure the port is not in used in any other background process.

user can ask in any format will hit this skill:
- "open tunnel to <target_host>", example: "open tunnel to demand-manager-api.platform-dev"
- "tunnel to <target_host>", example: "tunnel to demand-manager-api.platform-dev"
- "tunnel <target_host>", example: "tunnel demand-manager-api.platform-dev"

asking user to confirm the following details:
- allways asking user to provider the target_port, default value is 80.
- allways asking user to provider the local_port, default value pick between 8000 to 8999, make sure the port is not in use in any other background process.
- if host already has a nickname, then don't ask user to provide the target_host.
- ask user to give it a nickname for target host if no nickname point to this host, remember target_host that provided by user, and nickname can use this for future reference.
- required arguments: target_host, target_port, local_port
- while executing bash script, make sure make it as a background process, should not block claude code main process.
- dx command is available in the global node_modules folder, add it to the path before executing dx-tunnel.js.
- if user dosn't have dx installed in global, use `npx @siteminder/dx` to execute the command instead of `dx`.
- command for executing the script:
```bash
dx infrastructure tunnel --target_host <target_host> --target_port <target_port> --local_port <local_port>
```
- present all stdout and stderr output to the user.
- then wait for user to approve for further actions.
- user can provide the nickname or the target_host to asking stop the tunnel process.
- once user asking to stop the tunnel process, then stop the process and return the result to the user.

## Examples

#### Example for first time open tunnel and no nickname.
- user request: "open tunnel to demand-manager-api.platform-dev"
- meaning: 
  - <target_host> is demand-manager-api.platform-dev
  - <target_port> is not provided, default is 80
  - <local_port> is not provided, should be selected between 8000 to 8999, make sure the port is not in used in any other background process.
- command:
```bash
dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port 8080
```

#### Example for first time and second time open tunnel with nickname.
- user first request: "open tunnel to demand-manager-api.platform-dev"
- then ask user to give it a nickname for target host, and remember it for future use.
- user provide the nickname: "platform-dev-dm-api"
- user second request: "open tunnel to platform-dev-dm-api"
- meaning:
  - <target_host> is demand-manager-api.platform-dev, because nickname is pointing to this host.
  - <target_port> is not provided, default is 80
  - <local_port> is not provided, usinng this plugin default to select a port between 8000 to 8999, make sure the port is not in use.
- then command:
```bash
   dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port 8080
```
- because platform-dev-dm-api is pointing to demand-manager-api.platform-dev.

#### Example for user who dosn't have dx installed in global
- user request: "open tunnel to demand-manager-api.platform-dev"
- because user doesn't have dx installed in global, so this will fall back to use `npx @siteminder/dx` to execute the command instead of `dx`.
- meaning:
  - <target_host> is demand-manager-api.platform-dev
  - <target_port> is not provided, default is 80
  - <local_port> is not provided, usinng this plugin default to select a port between 8000 to 8999, make sure the port is not in use.
- then the command should be:
```bash
npx @siteminder/dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port 8080
```

#### Example for stop the tunnel process.
- user request: "stop platform-dev-dm-api"
- user request: "stop demand-manager-api.platform-dev"
- then stop that background process and return the result to the user.