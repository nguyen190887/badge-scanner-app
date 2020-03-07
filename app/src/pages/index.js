import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TopicList } from '../components/TopicList';
import { allTopics } from '../graphql/queries';
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
              <TopicList topics={data} />
        }
        <TopicRegisterDialog open={openOverlay} setOpen={setOpenOverlay} />
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
