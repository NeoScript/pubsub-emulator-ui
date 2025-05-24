FROM node:20-alpine as build

WORKDIR /app
ADD webapp .
RUN npm install
RUN npm run build

FROM nginx:alpine as serve
RUN apk update && apk upgrade
COPY scripts/docker/docker_nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/webapp/browser .
EXPOSE 80
