# badge-scanner-app
App to scan badge and extract employee ID

# Getting started
- Ensure AWS credentials are set
- Install [Serverless Framework](https://serverless.com/)

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
