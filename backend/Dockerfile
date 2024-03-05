FROM node:18.18.0 AS builder

WORKDIR /app

COPY . /app

RUN npm i --force
RUN npm rebuild bcrypt --build-from-source
RUN npm run build

FROM node:18.18.0-alpine

COPY --from=builder /app /app

WORKDIR /app

CMD ["node", "dist/app.js"]