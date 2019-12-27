import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LoginForm from '../components/loginForm';

console.log('Login', new Date().toISOString());

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(5),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Login" />
      <Container maxWidth="sm" className={classes.margin}>
        <LoginForm />
      </Container>
    </Layout>
  )
};

export default LoginPage;
