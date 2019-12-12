
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Scanner from '../components/scanner';
import useAuth from '../utils/useAuth';
import { TopicDetail, TopicAttendance, IdForm } from '.';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
  },
  pos: {
    marginBottom: 12,
  },
}));

const TrackAttendee = ({ topicId }) => {
  const { loggedIn } = useAuth();
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" component="h3">
        Track Attendees
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        Upload a photo of your ID badge or input your ID to text field below
      </Typography>
      {loggedIn && <Scanner topicId={topicId} />}
      <TopicAttendance topicId={topicId} />
    </Paper>
  );
}

export default TrackAttendee;
