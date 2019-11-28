cd app
gatsby build
cd ..
cd stack
sls s3sync --stage prod -v
cd ..
