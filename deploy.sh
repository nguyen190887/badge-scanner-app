STAGE=${1:-dev}
WEBSITE_BUCKET="tnn.badge-scanner-web-$STAGE" #todo: read CF stack

# Deploy stack
cd stack
npm i
sls deploy -v -s $STAGE
cd ..

# Build app
. deploy_web.sh $STAGE
