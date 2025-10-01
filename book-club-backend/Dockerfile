FROM node:18-slim

WORKDIR /app

# 🛠️ Install OpenSSL for Prisma compatibility
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# 🚀 Start Fastify server with Prisma client generation
CMD ["sh", "-c", "npx prisma generate && npx ts-node src/server.ts"]