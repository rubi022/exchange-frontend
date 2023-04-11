FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html
COPY ../nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx *

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
