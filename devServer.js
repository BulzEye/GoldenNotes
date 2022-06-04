const args = [ 'devstart' ];
const opts = { stdio: 'inherit', cwd: 'gn-backend', shell: true };
require('child_process').spawn('npm', args, opts);