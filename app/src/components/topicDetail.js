import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  pos: {
    marginBottom: 12,
  },
  card: {
    marginTop: theme.spacing(2),
  }
}));

const TopicDetail = ({ data: { topic = {} } = {} }) => {
  const classes = useStyles();

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {topic.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {topic.owner}
        </Typography>
        <Hidden mdDown>
          <Typography variant="body2" component="p">
            {topic.smeGroup}
            <br />
            {topic.date}
            <br />
            {topic.status}
            <br />
            {topic.duration}
          </Typography>
        </Hidden>
      </CardContent>
    </Card>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: topic.notes }} />
      </CardContent>
    </Card>
    </>
  );
}

export default TopicDetail;
