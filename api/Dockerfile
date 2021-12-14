# STAGE 1
FROM node:16-alpine3.12 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

# To wait MongoDB start
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# STAGE 2
FROM node:16-alpine3.12 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist ./
RUN npm install --only=production

# STAGE 3
FROM gcr.io/distroless/nodejs:16
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["server.js"]