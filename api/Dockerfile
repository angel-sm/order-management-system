FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci && \
    rm -f .npmrc

COPY . .

RUN npx prisma generate

RUN npm run build && \
    npm prune --production

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm run start:prod"