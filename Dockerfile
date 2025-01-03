FROM node:20-alpine AS build

WORKDIR /app
ADD webapp .
RUN npm install
RUN npm run build:ngssc

FROM nginx:alpine AS serve
COPY scripts/docker/docker_nginx.conf /etc/nginx/conf.d/default.conf

ADD https://github.com/kyubisation/angular-server-side-configuration/releases/download/v18.2.0/ngssc_64bit /usr/sbin/ngssc
RUN chmod +x /usr/sbin/ngssc

COPY scripts/docker/ngssc.sh /docker-entrypoint.d/ngssc.sh
RUN chmod +x /docker-entrypoint.d/ngssc.sh

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/webapp/browser .
EXPOSE 80
