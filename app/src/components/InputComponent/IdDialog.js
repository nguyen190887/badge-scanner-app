import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import InputTabs from './InputTabs';

const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export default ({ topicId, addRow, open, setOpen }) => {
  const classes = useStyles();
  const idRef = useRef(null);
  const userNameRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      addRow({ variables: { topicId, userId: idRef.current.value, userName: userNameRef.current.value } })
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit ID</DialogTitle>
        <DialogContent>
          <InputTabs idRef={idRef} userNameRef={userNameRef} />
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
