import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
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

const IndexPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(gql`${allTopics}`);
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [addTopic] = useMutation(gql`${updateTopic}`,
    // {
    //   update(cache, { data: { updateTopic } }) {
    //     const data = cache.readQuery({ query: gql`${topicAttendance}`, variables: { topicId } });
    //     data.topicAttendance = [addTrackingRow, ...data.topicAttendance];
    //     cache.writeQuery({
    //       query: gql`${topicAttendance}`,
    //       variables: { topicId },
    //       data
    //     });
    //   },
    // }
  );

  return (
    <Layout>
      <SEO title="Home" />
      <Fab className={classes.fab} color="primary" onClick={() => { setOpenOverlay(true); }}>
        <AddIcon />
      </Fab>
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
        <TopicRegisterDialog open={openOverlay} setOpen={setOpenOverlay} updateTopic={addTopic} />
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Topic registration success!
        </MuiAlert>
      </Snackbar>
    </Layout>
  )
};

export default IndexPage;
