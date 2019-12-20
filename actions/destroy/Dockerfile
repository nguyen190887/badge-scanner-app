FROM node:12-alpine

LABEL "com.github.actions.name"="Sharing Tracker - Destroy"
LABEL "com.github.actions.description"="Destroy current branch"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/nguyen190887/badge-scanner-app"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="nguyen190887"

# Install awscli
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

RUN npm i -g serverless

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
