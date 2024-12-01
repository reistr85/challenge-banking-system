FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN corepack enable

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn global add @nestjs/cli

EXPOSE 3000

CMD ["yarn", "start:dev"]
