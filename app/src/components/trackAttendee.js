
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { topicAttendance } from '../graphql/queries';
import { addTrackingRow } from '../graphql/mutations';
import Scanner from '../components/scanner';
import useAuth from '../utils/useAuth';
import AttendanceTable from './attendanceTable';
import IdForm from './idForm';

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

  const topicAttendanceQuery = useQuery(gql`${topicAttendance}`,
    { variables: { topicId } }
  );

  const [addRow] = useMutation(gql`${addTrackingRow}`,
    {
      update(cache, { data: { addTrackingRow } }) {
        const data = cache.readQuery({ query: gql`${topicAttendance}`, variables: { topicId } });
        data.topicAttendance = [addTrackingRow, ...data.topicAttendance];
        cache.writeQuery({
          query: gql`${topicAttendance}`,
          variables: { topicId },
          data
        });
      },
    }
  );

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" component="h3">
        Track Attendees
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        Upload a photo of your ID badge or input your ID to text field below
      </Typography>
      {loggedIn && <Scanner topicId={topicId} />}
      <IdForm topicId={topicId} addRow={addRow} />
      <AttendanceTable {...topicAttendanceQuery} />
    </Paper>
  );
}

export default TrackAttendee;
