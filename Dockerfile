# Builder Step
FROM node as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build

# Production Step
FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --quiet

COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
COPY --from=builder /app/dist ./dist

# For some reason i need to copy these two folders for swagger to work
COPY --from=builder /app/dataModels ./dataModels
COPY --from=builder /app/controllers ./controllers

EXPOSE 3000

CMD ["npm","run", "start:migrate:prod"]