FROM node:14-alpine

WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm install
COPY . .
ENV HOST=0.0.0.0 DANGEROUSLY_DISABLE_HOST_CHECK=true
CMD ["npm", "start"]