![](https://github.com/nguyen190887/badge-scanner-app/workflows/Build%20&%20Deploy/badge.svg)

# Sharing Tracker App
Track sharing activities in a team.

# Getting started
- Ensure AWS credentials are set
- Install [Serverless Framework](https://serverless.com/) (`yarn global add serverless`)
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
- Run `yarn` or `npm i` to install packages
- Run `yarn start` or `npm start` (or `gatsby develop`)

## Backend
- `cd` to `stack/`
- Run `yarn` or `npm i` to install packages
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

# CI/CD
- Use [Github Actions](https://github.com/features/actions) for CI/CD. Each time codes are pushed to `app/` or `stack/` folder, CloudFormation stack will be created and executed. See you more at `.github/` folder.
- Ensure Github Secrets were set correctly (find them by exploring files in `.github/workflows/` folder)

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

## How to create new GraphQL query + resolver
1. Add new type (object, query, mutation, etc.)
  - Declare new type in `stack/schema.graphql`
  - Run `amplify codegen` in `stack`
  - New type is added to `app/graphql` to use on client side 
2. Add resolver for new query
  - Declare resources in `stack/serverless.yml`
    - Declare AppSync resources including mappingTemplates and dataSources as seen on AppSync
    - For dataSources point the config to a lambda function which will act as the resolver
      ```yml
      type: AWS_LAMBDA
      config:
        functionName: newFunc
      ```
    - Declare new lambda function in function section to register the resolver function, point the function to a handler
      ```yml
      newFunc:
        handler: handlers/funcHandler.index
      ```
  - Add a handler to where we point to in the lambda declaration, in this case, `handlers/funcHandler.js`

# Built-with
- GatsbyJS
- GraphQL, AWS Amplify
- AWS Cognito, Lambda, AppSync
- Google Sheet/Form API (“Sheet As A Database” - SAAD)
- Serverless Framework, GitHub Action

# Learning
- [Serverless Best Practices](https://medium.com/@PaulDJohnston/serverless-best-practices-b3c97d551535)
- [Serverless Terminal Commands](https://lorenstewart.me/2017/09/19/serverless-framework-terminal-commands/)
- [Yarn](https://yarnpkg.com/en/docs)
- Yarn is much faster than NPM [Yarn vs NPM](https://medium.com/@j.dumadag718/yarn-vs-npm-b2d58289fb9b)

