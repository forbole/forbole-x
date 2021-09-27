FROM node:14.17.1-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY yarn.lock /app/
COPY patches /app/patches
RUN yarn install

COPY . /app
COPY /misc/cryptocurrencies.prod.ts /app/misc/cryptocurrencies.ts
RUN yarn build

CMD [ "yarn", "start" ]