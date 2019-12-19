#!/bin/sh -l

sh -c "echo Hello world. My name is $MY_NAME"

ls -la

export AWS_ACCESS_KEY_ID=p"$AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"

STAGE="$BRANCH_NAME"
if [ "$BRANCH_NAME" = "master" ]; then
    STAGE="prod"
fi

. deploy.sh $STAGE
