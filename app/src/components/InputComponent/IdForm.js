import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    verticalAlign: 'bottom'
  }
}));

export default ({ topicId, addRow }) => {
  const inputRef = useRef(null);
  const userNameRef = useRef(null);
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      addRow({ variables: { topicId, userId: inputRef.current.value, userName: userNameRef.current.value } })
      inputRef.current.value = '';
      userNameRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <TextField inputRef={inputRef} label="Employee ID" id="standard-size-normal" type='tel' autofocus />
      <TextField inputRef={userNameRef} label="Name" id="standard-size-normal" type='text' />
      <Button type='submit' variant='text' className={classes.button}>Submit</Button>
    </form>
  );
};
