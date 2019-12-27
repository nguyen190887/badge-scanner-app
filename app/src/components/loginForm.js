import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { signIn } from '../utils/auth';

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

const LoginForm = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signIn(username, password);
      navigate('/');

    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }

  return (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
        <Typography variant="h5" component="h2" className={classes.title}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField name="username" label="Username" type="email" value={username} onChange={e => setUsername(e.target.value)} fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
              <TextField name="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required />
            </Grid>
          </Grid>
          <Grid container justify="center" className={classes.buttonContainer}>
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>Login</Button>
          </Grid>
        </form>
      </div>
    </Paper>
  )
}

export default LoginForm;
