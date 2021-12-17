FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
ADD build ./dist

# To wait MongoDB start
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Bundle app source
COPY . .

ENV NODE_ENV=production

EXPOSE 3666
CMD [ "node", "dist/server.js" ]