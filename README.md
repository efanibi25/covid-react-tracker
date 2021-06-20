Install
1. Clone Repository
2. Install Node  
3. Git Clone
4. cd into folder, npm install to set up backend
3. cd into client, npm install to set up client
4. Client is served on 3000, Server is 5000
5. To enable proper router and prevent CORS issues install nginx 

Reverse Proxy allow use to route requests

server {
        listen       8000; 
        server_name  localhost;
        location / {
       proxy_pass http://localhost:3000;
        }
        location /api/ {
           proxy_pass http://localhost:5000;

        }
}


In the example above you will reach the site with localhost:8000.
With the default settings program will route the request to the right path

If you have a domain name just route the domain to 8000

server {

  server_name covid.mysite.com;

  location / {
      proxy_pass http://localhost:8000/;
  }
