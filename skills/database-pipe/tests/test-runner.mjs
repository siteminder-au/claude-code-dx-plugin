// test-runner.mjs (run with: npx zx test-runner.mjs)
import('../scripts/dx-mysql-pipe.js').then(async mod => {
  const res = await mod.execute({
    tool_name: 'mysql_pipe',
    tool_input: {
    //   host: 'platform-dev-ppay-infrastructure.cluster-cfni24qvajia.us-west-2.rds.amazonaws.com',
      // port: 13305,         // optional
      // extraArgs: '--verbose true',
      detach: true
    },
    cwd: process.cwd()
  });
  console.log(JSON.stringify(res, null, 2));
}).catch(e => {
  console.error('Test-runner error', e);
});
