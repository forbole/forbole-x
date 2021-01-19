FROM node:14.5.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install --production

COPY . /app
RUN yarn build

CMD [ "yarn", "start" ]