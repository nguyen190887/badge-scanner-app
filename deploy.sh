STAGE=${1:-dev}

# Deploy stack
cd stack
npm i --production
sls deploy -v -s $STAGE
cd ..

# Build app
cd app
npm i --production
. gen_env.sh $STAGE
gatsby build

# Copy S3 website
cd ../stack
sls s3sync

cd ..
