FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && apt-get clean

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

RUN a2enmod rewrite

RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN npm install --legacy-peer-deps && npm run build
RUN php artisan migrate --force || true
EXPOSE 80

CMD php artisan migrate --force && /usr/sbin/apache2ctl -D FOREGROUND