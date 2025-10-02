import Fastify, { fastify } from 'fastify';
import { createPool } from './database/connection.js';
import { routes } from './routes/index.js';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });

createPool();
app.register(routes);

app.register(cors, {
  origin: ['*'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true,
});

app.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ message: error.message });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info('Servidor rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
