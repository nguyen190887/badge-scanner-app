import AWS from 'aws-sdk';
import { currentSession } from './auth';
import {
  REGION,
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_ID,
} from '../constants';

export const callWithCredentials = async callback => {
  const session = await currentSession();
  
  if (!(AWS.config.credentials.accessKeyId && session.isValid())) {
    const token = session.getIdToken().getJwtToken();
    const provider = `cognito-idp.${REGION}.amazonaws.com/${COGNITO_USERPOOL_ID}`;

    AWS.config.region = REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: COGNITO_IDENTITYPOOL_ID,
      Logins: {
        [provider]: token,
      },
    });
    AWS.config.credentials.get(function() {
      callback();
    });
  } else {
    callback();
  }
};
