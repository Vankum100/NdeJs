import { resolve } from 'path';
import { readFileSync } from 'fs';

const files = ['.bash_profile', '.npmrc'];

files.forEach(file => {
  const filePath = resolve(process.env.HOME, file);
  const data = readFileSync(filePath);
  console.log('File data is', data);
});
