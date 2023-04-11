FROM node:10.11 AS builder
WORKDIR /home/node
COPY . .

RUN yarn install && yarn build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder --chown=nginx:nginx /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
