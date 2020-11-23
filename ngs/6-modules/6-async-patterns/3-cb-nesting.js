import { readFile, writeFile } from 'fs';

readFile(__filename, function cb1(err, data) {
  writeFile(__filename + '.copy', data, function cb2(err) {
    // Nest more callbacks here...
  });
});

console.log('TEST');
