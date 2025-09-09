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
