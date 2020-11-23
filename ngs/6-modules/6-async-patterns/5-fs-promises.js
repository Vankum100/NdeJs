import { promises } from 'fs';
const { readFile } = promises;

async function main() {
  const data = await readFile(__filename);
  console.log('File data is', data);
}

main();

console.log('TEST');
