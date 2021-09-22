FROM nginx:latest
RUN apt-get update && apt-get install nano
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup

RUN mkdir /etc/nginx/ssl
RUN chmod -R 600 /etc/nginx/ssl

COPY ssl/ /etc/nginx/ssl/

ADD conf.d/carvcon.secure.conf /etc/nginx/conf.d/carvcon.conf
