FROM node:22-alpine

# Install openssl and other dependencies for Prisma on Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

# Apply schema, seed, and start server
# Using --accept-data-loss to ensure schema is pushed in dev/test environment
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node seed.js && node server.js"]
