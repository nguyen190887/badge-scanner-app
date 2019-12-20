#!/bin/sh -l

sh -c "echo Hello world. My name is $MY_NAME"

ls -la

# serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY
echo $SERVERLESS_ACCESS_KEY

export AWS_ACCESS_KEY_ID=p"$AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
export SERVERLESS_ACCESS_KEY="$SERVERLESS_ACCESS_KEY"

serverless login

STAGE="$BRANCH_NAME"
if [ "$BRANCH_NAME" = "master" ]; then
    STAGE="prod"
fi

. deploy.sh $STAGE
