FROM node:12-alpine

LABEL "com.github.actions.name"="Sharing Tracker - Deploy"
LABEL "com.github.actions.description"="Deploy the app"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/nguyen190887/badge-scanner-app"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="nguyen190887"

RUN npm i -g serverless
RUN npm i -g gatsby-cli

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]