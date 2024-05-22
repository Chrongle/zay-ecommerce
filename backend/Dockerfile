FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM base AS dev

CMD [ "npm", "run", "dev" ]

FROM base as prod

CMD [ "npm", "run", "start"]