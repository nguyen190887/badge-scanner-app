import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';

// todo: put these configs in correct place
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('routeUpdate', new Date().toISOString());
  Amplify.configure({
    Auth: {
      region: process.env.REGION,
      identityPoolId: process.env.COGNITO_IDENTITYPOOL_ID,
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      userPoolWebClientId: process.env.COGNITO_USERPOOL_CLIENT_ID,
    },
    aws_appsync_graphqlEndpoint: process.env.APPSYNC_ENDPOINT,
    aws_appsync_region: process.env.REGION,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: process.env.APPSYNC_API_KEY
  });
  PubSub.configure({
    Auth: {
      region: process.env.REGION,
      identityPoolId: process.env.COGNITO_IDENTITYPOOL_ID,
      userPoolId: process.env.COGNITO_USERPOOL_ID,
      userPoolWebClientId: process.env.COGNITO_USERPOOL_CLIENT_ID,
    },
    aws_appsync_graphqlEndpoint: process.env.APPSYNC_ENDPOINT,
    aws_appsync_region: process.env.REGION,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: process.env.APPSYNC_API_KEY
  });
};
