FROM node:14-alpine

WORKDIR /app
COPY ./yarn.lock ./package.json ./
RUN yarn install
COPY . .
ENV HOST=0.0.0.0
CMD ["yarn", "start"]