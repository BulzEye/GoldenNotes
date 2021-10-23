const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: '../gn-frontend', shell: true };
require('child_process').spawn('npm', args, opts);