STAGE=${1:-dev}
aws s3 rm s3://tnn.badge-scanner-web-$STAGE --recursive
aws s3 rm s3://tnn.image-badge-store-$STAGE --recursive
cd stack/
npm i
sls remove -s $STAGE
cd ..