#!/usr/bin/env zx

const minimist = require('./minimist');


/**
 * npx @siteminder/dx infrastructure deploy -C ta-config-dev/infrastructure/platform-dev/terraform.tfvars -b master -i no-jira-change-to-use-var
 * 
 * --system <system>
 * --environment <environment> prod, platform-dev, nxs-dev
 * --component <component>
 * --region <region> emea, apac
 * --build-version <build-version>
 * --config-branch <config-branch> default: master
 * --infrastructure-branch <infrastructure-branch> default: master
 * --workspace <workspace> required
 */

const exec = async () => {
  const arguments = minimist(process.argv.slice(2));


  
  const {
    system,
    environment,
    component,
    region,
    buildVersion,
    configBranch,
    infrastructureBranch,
    workspace,
  } = arguments;

  if (!workspace) {
    throw new Error('Workspace is required');
  }

  cd(`${workspace}`);

  const systemConfigPath = environment === 'prod' ? `${system}-config-pciprod` : `${system}-config-config-dev`;

  // example:ta-config-dev/infrastructure/platform-dev/terraform.tfvars
  let componentTerraformConfigPath = `${systemConfigPath}/${component}/${environment}/terraform.tfvars`;

  if (region) {
    componentTerraformConfigPath = `${systemConfigPath}/${component}/${environment}/${region}/terraform.tfvars`;
  }

  const configParams = `-b ${configBranch ?? 'master'} -i ${infrastructureBranch?? 'master'}`;
  const buildVersionParams = buildVersion ? `-V ${buildVersion}` : '';

  const command = `dx infrastructure deploy -C ${componentTerraformConfigPath} ${configParams} ${buildVersionParams}`;

  const result = await $`${command}`;
  console.log(result.stdout);

}

exec().then(() => {
  console.log('done');
}).catch((error) => {
  console.error(error);
});