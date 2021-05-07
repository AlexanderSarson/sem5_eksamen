# Do the build in a seperate image.
FROM node:14 AS builder
WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm install
COPY . .

# Make sure we don't ship with a development .env
# All configuration for the app is delivered via environment-variables at
# runtime.
RUN rm -f .env
RUN npm run build

# Then construct the actual deployable image.
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]