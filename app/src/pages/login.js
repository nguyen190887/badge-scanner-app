import React from 'react';
import Amplify from 'aws-amplify';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LoginForm from '../components/loginForm';
import {
  REGION,
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_CLIENT_ID,
  COGNITO_USERPOOL_ID,
} from '../constants';

Amplify.configure({
  Auth: {
    region: REGION,
    identityPoolId: COGNITO_IDENTITYPOOL_ID,
    userPoolId: COGNITO_USERPOOL_ID,
    userPoolWebClientId: COGNITO_USERPOOL_CLIENT_ID,
  },
});

const LoginPage = ({location}) => (
  <Layout>
    <SEO title="Login" />
    <h1>Login</h1>
    <LoginForm />
  </Layout>
);

export default LoginPage;
