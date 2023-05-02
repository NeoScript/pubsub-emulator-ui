# Builder
FROM node:16-alpine as build

WORKDIR /app

ADD webapp .

RUN npm install
RUN npm run build

# Runner
FROM amd64/nginx:alpine as run

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/webapp .

COPY scripts/replace_variable_on_start.sh /docker-entrypoint.d/
COPY scripts/default.conf.template /etc/nginx/templates/
