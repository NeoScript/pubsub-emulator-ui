FROM node:16-alpine as build

WORKDIR /app
ADD webapp .
RUN npm install
RUN npm run build

FROM nginx:alpine as serve
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/webapp .
EXPOSE 80
