FROM wordpress:7.1.3-php8.5-apache

# Serve on port 8000.
RUN sed -i 's/^Listen 80$/Listen 8000/' /etc/apache2/ports.conf \
 && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8000>/' /etc/apache2/sites-available/000-default.conf

COPY --from=wordpress:cli-2.12.0 /usr/local/bin/wp /usr/local/bin/wp

# SQLite instead of MySQL, so the example is one container.
ADD https://downloads.wordpress.org/plugin/sqlite-database-integration.3.1.1.zip /tmp/sqlite.zip
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/* \
 && unzip -q /tmp/sqlite.zip -d /usr/src/wordpress/wp-content/plugins \
 && sed 's#{SQLITE_IMPLEMENTATION_FOLDER_PATH}#/var/www/html/wp-content/plugins/sqlite-database-integration#; s#{SQLITE_PLUGIN}#sqlite-database-integration/load.php#' \
      /usr/src/wordpress/wp-content/plugins/sqlite-database-integration/db.copy > /usr/src/wordpress/wp-content/db.php \
 && rm /tmp/sqlite.zip

COPY realm-example /usr/src/wordpress/wp-content/themes/realm-example
COPY apache2-setup /usr/local/bin/apache2-setup

# Follow whatever host the browser used, so a mapped port works too.
ENV WORDPRESS_CONFIG_EXTRA="if (isset(\$_SERVER['HTTP_HOST'])) { define('WP_HOME', 'http://' . \$_SERVER['HTTP_HOST']); define('WP_SITEURL', WP_HOME); }"
EXPOSE 8000
CMD ["apache2-setup"]
