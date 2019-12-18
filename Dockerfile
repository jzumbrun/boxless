FROM node:12.13.1-buster
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .