import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttons: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

const TopicRegisterDialog = ({ updateTopic, open, setOpen }) => {
  const classes = useStyles();
  const dateRef = useRef(null);
  const nameRef = useRef(null);
  const ownerRef = useRef(null);
  const statusRef = useRef(null);
  const smeGroupRef = useRef(null);
  const durationRef = useRef(null);
  const noteRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      updateTopic({
        variables: {
          date: dateRef,
          name: nameRef,
          owner: ownerRef,
          status: statusRef,
          smeGroup: smeGroupRef,
          duration: durationRef,
          note: noteRef
        },
        optimisticResponse: {
          __typename: "Mutation",
          addTrackingRow: {
            __typename: "Topic",
            date: dateRef.current.value,
            name: nameRef.current.value,
            owner: ownerRef.current.value,
            status: statusRef.current.value,
            smeGroup: smeGroupRef.current.value,
            duration: durationRef.current.value,
            note: noteRef.current.value
          }
        },
      })
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register Topic</DialogTitle>
        <DialogContent>
          <TextField inputRef={nameRef} label="Topic" type="text" autoFocus fullWidth className={classes.textField} />
          <TextField inputRef={ownerRef} label="Owner" type="text" fullWidth className={classes.textField} />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">SME Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="frontend">Frontend</MenuItem>
              <MenuItem value="backend">Backend</MenuItem>
              <MenuItem value="softskill">Soft Skill</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField inputRef={dateRef} label="Present date" type="date" fullWidth className={classes.textField} />
          <TextField inputRef={durationRef} label="Duration" type="text" fullWidth className={classes.textField} />
          <TextField inputRef={statusRef} label="Status" type="text" fullWidth className={classes.textField} />
          <TextField inputRef={noteRef} label="Note" type="text" fullWidth className={classes.textField} />
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

export default TopicRegisterDialog;
