FROM node:lts-alpine AS base

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

FROM base AS dev

CMD [ "npm", "run", "dev" ]

FROM base AS prod

RUN npm install -g http-server

CMD [ "http-server", "dist" ]