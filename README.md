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
  COGNITO_IDENTITYPOOL_ID=<(Federated Identities > Selected Identity Pool/Create new > Sample code > Select Javascript > Get AWS Credentials)>
  COGNITO_USERPOOL_ID='us-east-1_XXXXXX', (User pools > General Settings > Pool Id)
  COGNITO_USERPOOL_CLIENT_ID=<26-char alphanumeric string> (User pools > General Settings > App clients > App client id)
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
- Run
  - `. deploy.sh` (for MAC)
  - `TBD` (for Windows) 

# FAQs
1. How to get Cognito info?
  - `cd` to `stack/`, then run `sls info -v`
