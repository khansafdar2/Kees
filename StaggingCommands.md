Stagging Deployment Commands

uat.kees.qa------------------

npm run build-kees-uat
aws ecr get-login-password --region us-east-1 --profile kees_account | docker login --username AWS --password-stdin 510219444800.dkr.ecr.us-east-1.amazonaws.com
docker build -t uat-kees-react-storefront .
docker tag uat-kees-react-storefront:latest 510219444800.dkr.ecr.us-east-1.amazonaws.com/uat-kees-react-storefront:latest
docker push 510219444800.dkr.ecr.us-east-1.amazonaws.com/uat-kees-react-storefront:latest
aws ecs update-service --service staging-kees-storefront --cluster kees --force-new-deployment --region us-east-1 --profile kees_account
