import express from 'express';

const server = express();

server.get('/', (_, res) => {
  return res.send('tá pronto o sorvetinho!');
});

export { server };
