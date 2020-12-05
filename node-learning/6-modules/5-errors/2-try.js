import { resolve } from 'path';
import { readFileSync } from 'fs';

const files = ['.bash_profile', 'kjkjhh', '.npmrc'];

files.forEach(file => {
  try {
    const filePath = resolve(process.env.HOME, file);
    const data = readFileSync(filePath);
    console.log('File data is', data);
  } catch (err) {
    console.log('File not found');
  }
});
