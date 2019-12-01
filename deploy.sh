cd stack
npm i --production
sls deploy -v
cd ..
# TODO: grab stack's output, then put to environment file
cd app
gatsby build
cd ..
