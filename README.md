# badge-scanner-app
App to scan badge and extract employee ID

# Getting started
- Ensure AWS credentials are set
- Install [Serverless Framework](https://serverless.com/)

## Web App
- `CD` to `app/`
- Run `npm i` to install packages
- Create `.env.development` file, then enter below
  ```
  REGION=<region - e.g. us-east-1>
  COGNITO_IDENTITYPOOL_ID=<id>
  COGNITO_USERPOOL_ID=<id>
  COGNITO_USERPOOL_CLIENT_ID=<id>
  APPSYNC_API_KEY=<key>
  APPSYNC_ENDPOINT=<endpoint>
  ```
- Run `npm start` (or `gatsby develop`)

## Backend
- `CD` to `stack/`
- Run `npm i` to install packages
- Run `sls offline`

# Deploy
- Ensure you already logged in to [Serverless](https://dashboard.serverless.com/)
  - `cd` to `stack/`, then run `serverless` and follow steps
- Ensure `.env.production` file is setup correctly (similar to `.env.development`, but different keys/ids)
- `CD` to root folder
- Open `bash` (Windows) or `terminal` (Mac), then run `. deploy.sh`

## Deploy using stage
- `cd` to `stack/`
- Run `sls deploy --stage <stage_name>` (allowed stages are currently: `dev`, `qa`, `prod`)

# FAQs
1. How to get Cognito info?
  - `cd` to `stack/`, then run `sls info -v`
