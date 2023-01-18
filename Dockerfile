FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY src/ src/

EXPOSE 3000
ENTRYPOINT ["./node_modules/.bin/ts-node", "src/app.ts"]