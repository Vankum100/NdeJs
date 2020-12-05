import { readFileSync } from 'fs';

const data = readFileSync(__filename);

console.log('File data is', data);

console.log('TEST');
