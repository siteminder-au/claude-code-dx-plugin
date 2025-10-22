---
name: Siteminder DX deploy
description: use to deploy a siteminder component using the dx command
---

# Siteminder DX deploy

## Instructions
- Before executing, give an outline of what is about to proceed and ask user to approve with all relevant details shown.
- Ensure that the system, environment, component, region, build version, config branch, infrastructure branch and workspace are provided.
- required arguments: system, environment, component, workspace
- optional arguments: region, build version, config branch, infrastructure branch
- once ensured user has provided all required arguments, then execute (scripts/dx-deploy.js) with all the arguments provided.
- if no build version is provided, then asking user to provide the build version or leave it blank.
- before executing the script, asking user to confirm the details and ask for approval.
- command for executing the script:
```bash
npx zx scripts/dx-deploy.js --system <system> --environment <environment> --component <component> --workspace <workspace> --region <region> --build-version <build-version> --config-branch <config-branch> --infrastructure-branch <infrastructure-branch>
```
- if any optional arguments are not provided, then don't have to provide the argument in the command.
- for example: if region is not provided, then the command should be:
```bash
npx zx scripts/dx-deploy.js --system <system> --environment <environment> --component <component> --workspace <workspace> --build-version <build-version> --config-branch <config-branch> --infrastructure-branch <infrastructure-branch>
```

- once the command is executed, return the output in a user friendly format with relevant deploy details and links if any.
- if the command is executed successfully, then return the output in a user friendly format with relevant deploy details and links if any.
- if the command is executed unsuccessfully, then return the output in a user friendly format with relevant deploy details and links if any.

## Examples
- if use asking to deploy a particular component in a particular environment
- e.g: "deploy google-gha provider api to platform-dev"
- then the command should be:
```bash
npx zx scripts/dx-deploy.js --system google-gha --environment platform-dev --component provider-api --workspace ~/worskapcename  --config-branch master --infrastructure-branch master
```

- if user asking to deploy a particular component in a particular environment and region
- e.g: "deploy tbb-google pricing-bridge to platform-dev apac"
- then the command should be:
```bash
npx zx scripts/dx-deploy.js --system tbb-google --environment platform-dev --component pricing-bridge --workspace ~/worskapcename --region apac --config-branch master --infrastructure-branch master
```