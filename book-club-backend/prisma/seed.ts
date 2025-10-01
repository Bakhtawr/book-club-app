import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const author = await prisma.author.create({
    data: {
      name: 'Jane Austen',
      bio: 'British novelist',
    },
  });

  await prisma.book.create({
    data: {
      title: 'Pride and Prejudice',
      authorId: author.id,
      description: 'Classic romance novel',
      publishedYear: 1813,
    },
  });

  console.log('✅ Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());