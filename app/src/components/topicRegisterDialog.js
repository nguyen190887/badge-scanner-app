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
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
  const [selectedDate, setDate] = React.useState(new Date());
  const nameRef = useRef(null);
  const ownerRef = useRef(null);
  const durationRef = useRef(null);
  const noteRef = useRef(null);
  const [smeGroup, setSmeGroup] = React.useState('Frontend');
  const [status, setStatus] = React.useState('Initial');

  const handleGroupChange = event => {
    setSmeGroup(event.target.value);
  };
  const handleStatusChange = event => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      updateTopic({
        variables: {
          date: selectedDate,
          name: nameRef.current.value,
          owner: ownerRef.current.value,
          status: status,
          smeGroup: smeGroup,
          duration: durationRef.current.value,
          note: noteRef.current.value
        },
        // optimisticResponse: {
        //   __typename: "Mutation",
        //   addTrackingRow: {
        //     __typename: "Topic",
        //     date: selectedDate,
        //     name: nameRef.current.value,
        //     owner: ownerRef.current.value,
        //     status: status,
        //     smeGroup: smeGroup,
        //     duration: durationRef.current.value,
        //     note: noteRef.current.value
        //   }
        // },
      })
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Register Topic</DialogTitle>
      <DialogContent>
        <TextField inputRef={nameRef} label="Topic" type="text" autoFocus fullWidth className={classes.textField} />
        <TextField inputRef={ownerRef} label="Owner" type="text" fullWidth className={classes.textField} />
        <TextField inputRef={durationRef} label="Duration" type="text" fullWidth className={classes.textField} />
        <FormControl className={classes.formControl}>
          <InputLabel id="topic-group-label">SME Group</InputLabel>
          <Select
            labelId="topic-group-label"
            id="topic-group-simple-select"
            value={smeGroup}
            onChange={handleGroupChange}
          >
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="Soft Skill">Soft Skill</MenuItem>
            <MenuItem value="Book">Book</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="topic-status-label">Status</InputLabel>
          <Select
            labelId="topic-status-label"
            id="topic-status-simple-select"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="Initial">Initial</MenuItem>
            <MenuItem value="Planning">Planning</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Voting">Voting</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              showTodayButton
              label="Present Date"
              views={['year', 'month', 'date']}
              value={selectedDate}
              onChange={setDate}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
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
  );
}

export default TopicRegisterDialog;
