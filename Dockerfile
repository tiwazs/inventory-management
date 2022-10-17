FROM node as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "disr/index.js"]