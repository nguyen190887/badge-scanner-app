#!/bin/sh -l
serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

STAGE="$BRANCH_NAME"
if [ "$BRANCH_NAME" = "master" ]; then
    STAGE="prod"
fi

. deploy.sh $STAGE

# invalidate CF distro
if [ "$BRANCH_NAME" = "master" ]; then
    aws cloudfront create-invalidation --distribution-id $CF_DISTRIBUTION_ID --paths "/*"
fi
