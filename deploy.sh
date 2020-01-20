STAGE=${1:-dev}
WEBSITE_BUCKET="kka.sharing-tracker-web-$STAGE" #todo: read CF stack

# Deploy stack
cd stack
npm i

if [ "$STAGE" = "prod" ]; then
    sed -i 's/\/dev\//\/prod\//g' ssm-params.json
fi

sls deploy -v -s $STAGE
cd ..

# Build app
. deploy_web.sh $STAGE
