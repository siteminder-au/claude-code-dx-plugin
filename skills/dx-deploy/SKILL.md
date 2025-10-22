---
name: Siteminder DX deploy
description: use to deploy a siteminder component using the dx command
---

# Siteminder DX deploy

## Instructions
- there is a script called (scripts/dx-deploy.js) that is used to deploy a siteminder component using the dx command.
- this script is located in the (skills/dx-deploy/scripts/dx-deploy.js) folder, while executing find the script from there.
- and while executing the script, it will be executed using the (zx) command.
- ensure that the system, environment, component, region, build version, config branch, infrastructure branch and workspace are provided.
- required arguments: system, environment, component, workspace
- optional arguments: region, build version, config branch, infrastructure branch
- once ensured user has provided all required arguments, then execute (scripts/dx-deploy.js) with all the arguments provided.
- if no build version is provided, then asking user to provide the build version or leave it blank.
- before executing, give an outline of what is about to proceed and ask user to approve with all relevant details shown.
- command for executing the script:
```bash
dx-deploy.js --system <system> --environment <environment> --component <component> --workspace <workspace> --region <region> --build-version <build-version> --config-branch <config-branch> --infrastructure-branch <infrastructure-branch>
```
- if any optional arguments are not provided, then don't have to provide the argument in the command.
- for example: if region is not provided, then the command should be:
```bash
dx-deploy.js --system <system> --environment <environment> --component <component> --workspace <workspace> --build-version <build-version> --config-branch <config-branch> --infrastructure-branch <infrastructure-branch>
```

- once the command is executed, return the output and don't show any additional text.
- if any error occurs, then return the error message and don't show any additional text.
- and do not start any additional actions, and ask user to approve for further actions.

## Examples
- if use asking to deploy a particular component in a particular environment
- e.g: "deploy google-gha provider api to platform-dev"
- then the command should be:
```bash
dx-deploy.js --system google-gha --environment platform-dev --component provider-api --workspace ~/worskapcename  --config-branch master --infrastructure-branch master
```

- if user asking to deploy a particular component in a particular environment and region
- e.g: "deploy tbb-google pricing-bridge to platform-dev apac"
- then the command should be:
```bash
dx-deploy.js --system tbb-google --environment platform-dev --component pricing-bridge --workspace ~/worskapcename --region apac --config-branch master --infrastructure-branch master
```