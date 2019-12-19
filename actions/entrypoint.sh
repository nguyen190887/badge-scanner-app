#!/bin/sh -l

sh -c "echo Hello world. My name is $MY_NAME"

ls -la

STAGE="$BRANCH_NAME"
if [ "$BRANCH_NAME" = "master" ]; then
    STAGE="prod"
fi

. deploy.sh $STAGE
