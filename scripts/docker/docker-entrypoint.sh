#!/bin/sh
set -e

# Update runtime variables
envsubst '${AUTO_ATTACH_PUBSUB_PROJECTS}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp
envsubst '${DEFAULT_PUBSUB_EMULATOR_HOST}' < /usr/share/nginx/html/index.html.tmp > /usr/share/nginx/html/index.html

# Start nginx
exec nginx -g 'daemon off;'
