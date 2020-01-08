import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  itemText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

const TopicListDense = ({ topics: { allTopics = [] } = {}, onClickHandler }) => {
  const classes = useStyles();
  useEffect(() => {
    onClickHandler(allTopics[0].topicId);
  }, [])

  return (
    <div>
      <List>
        {allTopics.map((topic, i) => (
          <ListItem button onClick={event => { onClickHandler(topic.topicId); event.stopPropagation(); }} key={`topic_${i}`}>
            <ListItemText primary={topic.name} className={classes.itemText} />
          </ListItem>
        ))}
      </List>
    </div >
  );
}

export default TopicListDense;
