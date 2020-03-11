import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TopicList } from '../components/TopicList';
import { allTopics } from '../graphql/queries';
import { updateTopic } from '../graphql/mutations';
import { TopicRegisterDialog } from '../components';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
}));

const ManagePage = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(gql`${allTopics}`);

  return (
    <Layout>
      <Container maxWidth="lg">
        {
          loading ? <p>Loading...</p> :
            error ? <></> :
              <TopicList
                topics={data}
                onCellClick={(_, { colIndex, dataIndex, event }) => {
                  if (colIndex !== 0) {
                    event.stopPropagation();
                    navigate(`/topic/${data.allTopics[dataIndex].topicId}`);
                  }
                }}
              />
        }
        {/* <TopicRegisterDialog open={openOverlay} setOpen={setOpenOverlay} updateTopic={addTopic} /> */}
      </Container>

    </Layout>
  )
};

export default ManagePage;
