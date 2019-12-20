#!/bin/sh -l
serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

STAGE="$BRANCH_NAME"

cd stack
sls remove -s $STAGE