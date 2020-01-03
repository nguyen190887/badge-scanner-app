import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(theme => ({
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
            <ListItemText primary={topic.name} />
          </ListItem>
        ))}
      </List>
      {/* <TablePagination
        component="nav"
        page={0}
        rowsPerPage={10}
        count={100}
        onChangePage={() => { }}
      /> */}
    </div >
  );
}

export default TopicListDense;
