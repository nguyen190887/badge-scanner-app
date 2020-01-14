import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(2),
  }
}));

const TabPanel = (props) => {
  return (
    <Box hidden={props.value !== props.index}>{props.children}</Box>
  )
};

export default ({ idRef, userNameRef }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="Input Tabs">
        <Tab label='ID' />
        <Tab label='Name' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TextField inputRef={idRef} label="Employee ID" id="standard-size-normal" type='tel' autoFocus fullWidth className={classes.textField} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField inputRef={userNameRef} label="Name" id="standard-size-normal" type='text' autoFocus fullWidth className={classes.textField} />
      </TabPanel>
    </>
  )
}
