// routes/books.ts

import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function bookRoutes(fastify: FastifyInstance) {
  // 📚 GET all books
  fastify.get('/books', async (request, reply) => {
    const books = await prisma.book.findMany({ include: { author: true } });
    reply.send(books);
  });

  // 📘 GET book by ID
  fastify.get('/books/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
    if (!book) return reply.code(404).send({ error: 'Book not found' });
    reply.send(book);
  });

  // ➕ CREATE book
  fastify.post('/books', async (request, reply) => {
    const { title, description, publishedYear, authorId } = request.body as {
      title: string;
      description?: string;
      publishedYear: number;
      authorId: number;
    };

    if (!title || !publishedYear || !authorId) {
      return reply.code(400).send({ error: 'Missing required fields' });
    }

    try {
      const newBook = await prisma.book.create({
        data: {
          title,
          description,
          publishedYear,
          author: { connect: { id: authorId } },
        },
      });
      reply.code(201).send(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      reply.code(500).send({ error: 'Failed to create book' });
    }
  });

  // ✏️ UPDATE book
  fastify.put('/books/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, description, publishedYear, authorId } = request.body as {
      title?: string;
      description?: string;
      publishedYear?: number;
      authorId?: number;
    };

    try {
      const updatedBook = await prisma.book.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          publishedYear,
          authorId,
        },
      });
      reply.send(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      reply.code(404).send({ error: 'Book not found or update failed' });
    }
  });

  // ❌ DELETE book
  fastify.delete('/books/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.book.delete({ where: { id: Number(id) } });
      reply.code(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      reply.code(404).send({ error: 'Book not found or delete failed' });
    }
  });
}