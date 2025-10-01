import Fastify from 'fastify';
import cors from '@fastify/cors';
import bookRoutes from './routes/books';
import authorRoutes from './routes/authors';

async function start() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  });

  await fastify.register(bookRoutes); 
  await fastify.register(authorRoutes); 

  fastify.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ error: `Route ${request.method} ${request.url} not found` });
  });

  fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    console.log(`🚀 Server running at ${address}`);
  });
}

start().catch(err => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});