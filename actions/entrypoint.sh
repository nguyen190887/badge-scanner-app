#!/bin/sh -l
echo "Access key: $AWS_ACCESS_KEY_ID"
echo "Secret key: $AWS_SECRET_ACCESS_KEY"
echo "Serverless key: $SERVERLESS_ACCESS_KEY"

aws --version

export AWS_REGION="us-east-1"
# export AWS_ACCESS_KEY_ID=p"$AWS_ACCESS_KEY_ID"
# export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
# export SERVERLESS_ACCESS_KEY="$SERVERLESS_ACCESS_KEY"

serverless --version
serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

# BRANCH_NAME="${BRANCH_NAME/eng:/}"
STAGE="$BRANCH_NAME"
if [ "$BRANCH_NAME" = "master" ]; then
    STAGE="prod"
fi

. deploy.sh $STAGE

