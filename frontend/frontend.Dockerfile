# Use a lightweight base image
FROM nginx:alpine

# Copy the static website files to the Nginx document root
COPY . /usr/share/nginx/html

# docker build -t kosiekk/bd2-frontend -f frontend.Dockerfile .
# docker run -p 8080:80 --name my-frontend-container kosiekk/bd2-frontend
