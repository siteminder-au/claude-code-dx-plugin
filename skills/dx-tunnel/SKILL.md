---
name: dx tunnel
description: open a tunnel to a remote host using the dx command
---

# dx tunnel

## Instructions
- dx command is available in the global node_modules folder, add it to the path before executing dx-tunnel.js.
- if user dosn't have dx installed in global, use `npx @siteminder/dx` to execute the command instead of `dx`.
- before executing, please add all user bash environment variables to the command.
- before executing, give an outline of what is about to proceed and ask user to approve with all relevant details shown.
- required arguments: target_host, target_port, local_port
- asking user to provide the target_host, note: this host can be get from k8s dashaboard.
- allways asking user to provider the target_port, default value is 80.
- allways asking user to provider the local_port, default value pick between 8000 to 8999, make sure the port is not in use.

- ask user to give it a nickname for target host, remember target_host that provided by user, and nickname can use this for future reference.

- while executing bash script, make sure make it as a background process, should not block claude code main process.
- command for executing the script:
```bash
# npx @siteminder/dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port 3555
dx infrastructure tunnel --target_host <target_host> --target_port <target_port> --local_port <local_port>
```
- if any optional arguments are not provided, then don't have to provide the argument in the command.
- present all stdout and stderr output to the user.
- then wait for user to approve for further actions.
- user can provide the nickname or the target_host to asking stop the tunnel process.
- once user asking to stop the tunnel process, then stop the process and return the result to the user.

## Examples

#### Example for first time open tunnel and no nickname.
- user request: "open tunnel to demand-manager-api.platform-dev"
- command:
```bash
   dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port <local_port>
```

#### Example for first time and second time open tunnel with nickname.
- user first request: "open tunnel to demand-manager-api.platform-dev and give it a nickname of "platform-dev-dm-api"
- user second request: "open tunnel to platform-dev-dm-api"
- then command:
```bash
   dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port <local_port>
```
- because platform-dev-dm-api is pointing to demand-manager-api.platform-dev.

#### Example for user who dosn't have dx installed in global
- user request: "open tunnel to demand-manager-api.platform-dev"
- then the command should be:
```bash
npx @siteminder/dx infrastructure tunnel --target_host demand-manager-api.platform-dev --target_port 80 --local_port <local_port>
```

#### Example for stop the tunnel process.
- user request: "stop platform-dev-dm-api"
- user request: "stop demand-manager-api.platform-dev"
- then stop that background process and return the result to the user.