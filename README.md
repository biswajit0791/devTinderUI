# Deployment

- Signup on AWS
- Launch Instance
- chmod 400 "devTinder-secret.pem"
- run ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-252-218.eu-north-1.compute.amazonaws.com
- Install Node version
- Git CLone
- Frontend
  - npm install -> Dependencies
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html (sudo scp -r dist/\* /var/www/html)
  - Enable port 80 of your instance
- Backend
  - npm install
  - Allowed ec2 instance public ip on mongodb server for whitelisting
  - install npm i pm2 -g
  - pm2 start npm --start
  - for logs pm2 logs
  - clear log pm2 flush <name>, pm2 list, pm2 stop <name>, pm2 delete <name>'
  - Custom name: pm2 start npm --name="devTinder-backend" -- start
  - sudo nano /etc/nginx/sites-available/default
  - add server_name 13.60.252.218;
    location /api/ {
    proxy_pass http://localhost:7777/; # Ensure trailing slash here!
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
  - Save nginx file
  - Restart nginx with sudo systemctl restart nginx
  - Modify base url in frontend project to /api
