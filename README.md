![](https://github.com/nguyen190887/badge-scanner-app/workflows/Build%20&%20Deploy/badge.svg)

# Sharing Tracker App
Track sharing activities in a team.

# Getting started
- Ensure AWS credentials are set
- Install [Serverless Framework](https://serverless.com/)
- Ensure `Node.js 12` is installed

## Web App
- `cd` to `app/`
- Run `. gen_env.sh` to generate `.env.devolopment` file
  - The file looks like below
    ```
    REGION=<region - e.g. us-east-1>
    COGNITO_IDENTITYPOOL_ID=<id>
    COGNITO_USERPOOL_ID=<id>
    COGNITO_USERPOOL_CLIENT_ID=<id>
    BUCKET_IMAGE=<bucket>
    APPSYNC_API_KEY=<key>
    APPSYNC_ENDPOINT=<endpoint>
    ```
  - To generate for another stage, run `. gen_env.sh <stage>`
- Run `npm i` to install packages
- Run `npm start` (or `gatsby develop`)

## Backend
- `cd` to `stack/`
- Run `npm i` to install packages
- Run `sls offline`

# Deploy
- Ensure you already logged in to [Serverless](https://dashboard.serverless.com/)
  - `cd` to `stack/`, then run `serverless` and follow steps
- Ensure `.env.production` file is setup correctly (similar to `.env.development`, but different keys/ids)
- `cd` to root folder
- Open `bash` (Windows) or `terminal` (Mac), then run `. deploy.sh`

## Deploy using stage
- `cd` to `stack/`
- Run `sls deploy --stage <stage_name>` (allowed stages are currently: `dev`, `qa`, `prod`)

## Deploy a function
- Run `sls deploy function -f <fn_name>`

# FAQs
1. How to get Cognito info?
  - `cd` to `stack/`, then run `sls info -v`

2. How to seed user for testing?
  - Run below script (or create `.sh` file, then execute)
  ```bash
  USERPOOL_ID=us-east-1_xxxxxxxx
  USERNAME=your@user.name
  PASSWORD=yourpwd
  aws cognito-idp admin-create-user --user-pool-id $USERPOOL_ID --username $USERNAME 
  aws cognito-idp admin-set-user-password --user-pool-id $USERPOOL_ID --username $USERNAME --password $PASSWORD --permanent
  ```

3. How to add new GraphQL type?
  - Declare new type in `stack/schema.graphql`
  - Run `amplify codegen` in `stack`
  - New type is added to `app/graphql` to use on client side 

# Built-with
- GatsbyJS
- GraphQL, AWS Amplify
- AWS Cognito, Lambda, AppSync
- Google Sheet/Form API (“Sheet As A Database” - SAAD)
- Serverless Framework, GitHub Action

# Learning
- [Serverless Best Practices](https://medium.com/@PaulDJohnston/serverless-best-practices-b3c97d551535)
- [Serverless Terminal Commands](https://lorenstewart.me/2017/09/19/serverless-framework-terminal-commands/)

