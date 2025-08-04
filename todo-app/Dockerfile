FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:8081/todo-backend/

RUN npm install
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/public ./standalone/public

CMD ["node", "./standalone/server.js"]