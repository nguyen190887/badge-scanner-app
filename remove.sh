STAGE=${1:-dev}
aws s3 rm s3://kka.sharing-tracker-web-$STAGE --recursive
aws s3 rm s3://kka.shaing-tracker-image-store-$STAGE --recursive
cd stack/
npm i
sls remove -s $STAGE
cd ..
