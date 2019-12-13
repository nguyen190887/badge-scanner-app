STAGE=${1:-dev}
WEBSITE_BUCKET="tnn.badge-scanner-web-$STAGE" #todo: read CF stack

# Deploy stack
cd stack
npm i --production
sls deploy -v -s $STAGE
cd ..

# Build app
cd app
rm -rf public/*
npm i --production
. gen_env.sh $STAGE prod
gatsby build

# Copy S3 website
aws s3 sync public/ s3://$WEBSITE_BUCKET --cache-control max-age=31557600 --exclude public/index.html #todo: consider deleting files
aws s3 cp public/index.html s3://$WEBSITE_BUCKET/index.html

cd ..
