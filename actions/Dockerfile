FROM node:12-alpine

LABEL "com.github.actions.name"="Sharing Tracker - Deploy"
LABEL "com.github.actions.description"="Deploy the app"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/nguyen190887/badge-scanner-app"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="nguyen190887"

# # RUN apk add --update \
# #     python \
# #     python-dev \
# #     py-pip \
# #     build-base \
# #   && pip install virtualenv \
# #   && rm -rf /var/cache/apk/*
RUN echo "**** install Python ****" && \
    apk add --no-cache python3 && \
    if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
    \
    echo "**** install pip ****" && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi
RUN pip3 install awscli --upgrade --user
RUN export PATH=~/.local/bin:$PATH
RUN aws --version

# RUN npm i -g serverless
# RUN npm i -g gatsby-cli

# ADD entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]