import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputTabs from './InputTabs';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  box: {
    maxWidth: '400px'
  },
  button: {
    alignSelf: 'flex-end'
  }
}));

export default ({ topicId, addRow }) => {
  const idRef = useRef(null);
  const userNameRef = useRef(null);
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      addRow({ variables: { topicId, userId: idRef.current.value, userName: userNameRef.current.value } })
      idRef.current.value = '';
      userNameRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box display='flex'>
      <Box className={classes.box}>
        <InputTabs idRef={idRef} userNameRef={userNameRef} />
      </Box>
      <Button type='submit' variant='text' className={classes.button}>Submit</Button>
    </Box>
  );
};
