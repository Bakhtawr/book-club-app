import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function authorRoutes(fastify: FastifyInstance) {
  // 👤 GET all authors
  fastify.get('/authors', async (request, reply) => {
    const authors = await prisma.author.findMany();
    reply.send(authors);
  });

  // 👤 GET author by ID
  fastify.get('/authors/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const author = await prisma.author.findUnique({ where: { id: Number(id) } });
    if (!author) return reply.code(404).send({ error: 'Author not found' });
    reply.send(author);
  });

  // ➕ CREATE author
  fastify.post('/authors', async (request, reply) => {
    const { name } = request.body as { name: string };
    if (!name) return reply.code(400).send({ error: 'Name is required' });

    try {
      const newAuthor = await prisma.author.create({ data: { name } });
      reply.code(201).send(newAuthor);
    } catch (error) {
      console.error('Error creating author:', error);
      reply.code(500).send({ error: 'Failed to create author' });
    }
  });

  // ✏️ UPDATE author
  fastify.put('/authors/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name } = request.body as { name?: string };

    try {
      const updatedAuthor = await prisma.author.update({
        where: { id: Number(id) },
        data: { name },
      });
      reply.send(updatedAuthor);
    } catch (error) {
      console.error('Error updating author:', error);
      reply.code(404).send({ error: 'Author not found or update failed' });
    }
  });

  // ❌ DELETE author
  fastify.delete('/authors/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.author.delete({ where: { id: Number(id) } });
      reply.code(204).send();
    } catch (error) {
      console.error('Error deleting author:', error);
      reply.code(404).send({ error: 'Author not found or delete failed' });
    }
  });
}