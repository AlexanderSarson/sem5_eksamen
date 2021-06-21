FROM node:14-alpine

WORKDIR /app
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .
ENV HOST=consumer.sarson.me
CMD ["yarn", "start"]