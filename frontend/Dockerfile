# Use an official Nginx image to serve static files
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static files to the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
