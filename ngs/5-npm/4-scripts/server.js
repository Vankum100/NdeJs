import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express!');
});

server.listen(8000, () => {
  console.log('Server is running...');
});

