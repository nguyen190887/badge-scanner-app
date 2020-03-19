import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { topic, topicAttendance } from '../graphql/queries';
import { addTrackingRow } from '../graphql/mutations';
import SEO from '../components/seo';
import { isClient } from '../components/utils';
import { TopicDetail, TrackAttendee, IdDialog, Layout } from '../components';

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: 'none'
  }
}));

const Breadcrumb = (classes, topic) => (
  <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
    <Link to="/" className={classes.link}>
      <Typography color="textSecondary">Topics</Typography>
    </Link>
    <Typography color="textPrimary">{topic.name}</Typography>
  </Breadcrumbs>
)

const TopicPage = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openInfoBar, setOpenInfoBar] = useState(false);
  const [openSuccessBar, setOpenSuccessBar] = useState(false);

  const toggleInfoBar = () => {
    setOpenInfoBar(!openInfoBar);
  };
  const toggleSuccessBar = () => {
    setOpenSuccessBar(!openSuccessBar);
  };

  const topicId = props.id ? props.id : '';

  const { loading: topicLoading, error: topicError, data: topicData } = useQuery(gql`${topic}`,
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
      onCompleted() {
        toggleSuccessBar();
      }
    }
  );

  useEffect(() => {
    if (isClient) {
      const query = window.location.search.substring(1).split("=");
      if (query.length > 1) {
        if (query[0] === 'src' && query[1] === 'qr') {
          setOpenDialog(true)
        }
      }
    }
  }, [])

  return (
    <Layout>
      <SEO title={topicData && topicData.topic.name} />
      <IdDialog topicId={topicId} addRow={addRow} open={openDialog} setOpen={setOpenDialog} />
      <Container maxWidth='xl'>
        {topicId && (
          <Grid container spacing={2}>
            {topicData && <Hidden mdUp>{Breadcrumb(classes, topicData.topic)}</Hidden>}
            {topicLoading ? <p>Loading</p> :
              topicError ? <></> :
                <Grid item xs={12} md={3}>
                  <TopicDetail data={topicData} />
                </Grid>
            }
            <Grid item xs={12} md={9}>
              {topicData && <Hidden mdDown>{Breadcrumb(classes, topicData.topic)}</Hidden>}
              <TrackAttendee topicId={topicId} addRow={addRow} toggleInfoBar={toggleInfoBar} />
            </Grid>
          </Grid>
        )}
      </Container>
      <Snackbar open={openInfoBar} autoHideDuration={6000} onClose={toggleInfoBar}>
        <MuiAlert elevation={6} variant="filled" onClose={toggleInfoBar} severity="info">
          Adding your attendance info...
        </MuiAlert>
      </Snackbar>
      <Snackbar open={openSuccessBar} autoHideDuration={6000} onClose={toggleSuccessBar}>
        <MuiAlert elevation={6} variant="filled" onClose={toggleSuccessBar} severity="success">
          Attendance info added successfully!
        </MuiAlert>
      </Snackbar>
    </Layout >
  );
};

export default TopicPage;
