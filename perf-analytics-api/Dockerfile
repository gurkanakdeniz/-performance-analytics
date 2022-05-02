FROM node:17.8.0-alpine3.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN rm -rf node_modules
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "./bin/www" ]
