import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const topicDetail = ({ data: { topic  = [] } = {} }) => {
  const classes = styles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {topic.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {topic.owner}
        </Typography>
        <Typography variant="body2" component="p">
          {topic.smeGroup}
          <br />
          {topic.date}
          <br />
          {topic.status}
          <br />
          {topic.duration}
          <br />
          {topic.notes}
          Notes
        </Typography>
      </CardContent>
    </Card>
  );
}

export default topicDetail;
