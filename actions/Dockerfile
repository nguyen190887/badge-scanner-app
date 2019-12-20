FROM node:12-alpine
# FROM mesosphere/aws-cli

LABEL "com.github.actions.name"="Sharing Tracker - Deploy"
LABEL "com.github.actions.description"="Deploy the app"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/nguyen190887/badge-scanner-app"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="nguyen190887"

RUN echo "Key: $AWS_ACCESS_KEY_ID"
RUN apk -v --update add \
        python \
        py-pip \
        groff \
        less \
        mailcap \
        && \
    pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*
# VOLUME /root/.aws
# RUN aws --version

# RUN apk add --update nodejs npm
# RUN apk add --update npm
# RUN apk add --update nodejs nodejs-npm

RUN npm i -g serverless
RUN npm i -g gatsby-cli

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
