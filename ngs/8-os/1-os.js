import { platform, arch, cpus, homedir, EOL } from 'os';

console.log('OS platform:', platform());

console.log('OS CPU architecture:', arch());

console.log('# of logical CPU cores', cpus().length);

console.log('Home directory for current user', homedir());

console.log('line 1' + EOL + 'line 2' + EOL + 'line 3');
