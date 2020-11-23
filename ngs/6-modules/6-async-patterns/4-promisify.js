import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const readFile = promisify(_readFile);

async function main() {
  const data = await readFile(__filename);
  console.log('File data is', data);
}

main();

console.log('TEST');
