import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LoginForm from '../components/loginForm';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.COGNITO_IDENTITYPOOL_ID,
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USERPOOL_ID,
    userPoolWebClientId: process.env.COGNITO_USERPOOL_CLIENT_ID,
  }
});

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <h1>Login</h1>
    <LoginForm />
  </Layout>
)

export default LoginPage
