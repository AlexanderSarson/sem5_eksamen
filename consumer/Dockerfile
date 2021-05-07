FROM node:14-alpine

WORKDIR /app
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .

CMD ["yarn", "start"]