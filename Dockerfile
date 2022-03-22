FROM node:14-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY /src ./src

EXPOSE 3000

ENTRYPOINT ["npm", "start"]