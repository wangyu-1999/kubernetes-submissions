FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

ENV OUTPUT_FILE_PATH="/usr/src/app/files/"
ENV IMAGE_GENERATOR_URL="https://picsum.photos/1200.jpg"
ENV IMAGE_NAME="image.jpg"
ENV METADATA_NAME="metadata.json"
ENV OUTPUT_FOLDER_NAME="cache"

RUN npm install
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/public ./standalone/public

CMD ["node", "./standalone/server.js"]