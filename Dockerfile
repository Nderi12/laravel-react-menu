FROM php:8.2 as php

# Install Node.js and npm
# RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
#     && apt-get install -y nodejs

# Install PHP dependencies
RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev
RUN docker-php-ext-install pdo pdo_mysql bcmath

WORKDIR /var/www
COPY . .
COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer

ENV PORT=8000
ENTRYPOINT [ "docker/entrypoint.sh" ]