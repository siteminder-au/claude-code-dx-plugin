---
name: Siteminder DX deploy
description: use to deploy a siteminder component using the dx command
---

# Siteminder DX deploy

## Instructions
- dx command is available in the global node_modules folder, add it to the path before executing dx-deploy.js.
- before executing, please add all user bash environment variables to the command.
- ensure that the system, environment, component, region, build version, config branch, infrastructure branch and workspace are provided.
- required arguments: system, environment, component, workspace
- asking user to provide the workspace, and remember it for future use.
- optional arguments: region, build version, config branch, infrastructure branch
- allways asking user to provide config-branch and infrastructure-branch, if not provided, then use default values, options while asking is: master or provide your branch name.
- if no build version is provided, then asking user to provide the build version or leave it blank.
- before executing, change executing directory to the workspace that user has provided.
- before executing, give an outline of what is about to proceed and ask user to approve with all relevant details shown.
- command for executing the script:
- componentTerraformConfigPath is the path to the terraform config file for the component.
  - example for dev: ta-config-dev/infrastructure/platform-dev/terraform.tfvars
  - example for prod: ta-config-pciprod/infrastructure/platform-prod/terraform.tfvars
  - with region: ta-config-dev/infrastructure/platform-dev/apac/terraform.tfvars
- configBranch is the branch to checkout in the config repo, if it exists. default: master
- infrastructureBranch is the branch to checkout in the app infrastructure repo, if it exists. default: master
- buildVersion is the build version to deploy.
  - if no build version is provided, then don't have to provide the argument in the command.
```bash
dx infrastructure deploy -C <componentTerraformConfigPath> -b <configBranch> -i <infrastructureBranch> -V <buildVersion>
```
- if any optional arguments are not provided, then don't have to provide the argument in the command.
- present all stdout and stderr output to the user.
- then wait for user to approve for further actions.

## Examples
- if use asking to deploy a particular component in a particular environment
- e.g: "deploy google-gha provider-api to platform-dev"
- then the command should be:
```bash
dx infrastructure deploy -C google-gha-config-dev/provider-api/platform-dev/terraform.tfvars -b master -i master
```

- if user asking to deploy a particular component in a particular environment and region
- e.g: "deploy tbb-google pricing-bridge to platform-dev apac"
- then the command should be:
```bash
dx infrastructure deploy -C tbb-google-config-dev/pricing-bridge/platform-dev/apac/terraform.tfvars -b master -i master
```