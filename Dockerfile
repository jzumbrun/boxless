FROM node:12.13.1-buster
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .
RUN npm install -g pm2 && npm install -g mocha && npm install prettier -g
