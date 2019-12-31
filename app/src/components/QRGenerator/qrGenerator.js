
import React, { useState } from 'react';
import { navigate } from 'gatsby';
// import { signIn } from '../utils/auth';

import { Paper, makeStyles, Typography, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  buttonContainer: {
    marginTop: theme.spacing(3)
  },
  button: {
    textTransform: "none",
    width: '100%'
  }
}));

const LoginForm = () =>{

  return (<></>);
}

export default LoginForm;
