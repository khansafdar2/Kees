Live Production Deployment Commands

kees domain commands
kees.qa------------------------

npm run build
aws ecr get-login-password --region us-east-1 --profile kees | docker login --username AWS --password-stdin 510219444800.dkr.ecr.us-east-1.amazonaws.com
docker build -t kees-storefront .
docker tag kees-storefront:latest 510219444800.dkr.ecr.us-east-1.amazonaws.com/kees-storefront:latest
docker push 510219444800.dkr.ecr.us-east-1.amazonaws.com/kees-storefront:latest
aws ecs update-service --service kees-storefront --cluster kees --force-new-deployment --region us-east-1 --profile kees
