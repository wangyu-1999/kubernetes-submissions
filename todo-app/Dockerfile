FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

CMD ["node", ".next/standalone/server.js"]