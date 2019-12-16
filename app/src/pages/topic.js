import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { topic } from '../graphql/queries';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TopicDetail, TrackAttendee } from '../components';

const useStyles = makeStyles(theme => ({
  breadcrumb: {
    margin: theme.spacing(2),
  },
}));

const Breadcrumb = (classes, topic) => (
  <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
    <Link color="inherit" href="/">Topics</Link>
    <Typography color="textPrimary">{topic.name}</Typography>
  </Breadcrumbs>
)

const TopicPage = (props) => {
  const classes = useStyles();

  const topicId = props.id ? props.id : '';

  const { loading: topicLoading, error: topicError, data: topicData } = useQuery(gql`${topic}`,
    { variables: { topicId } }
  );

  return (
    <Layout>
      <SEO title={topicData.topic.name} />
      <Container maxWidth='xl'>
        {topicId && (
          <Grid container spacing={2}>
            {topicData && <Hidden mdUp>{Breadcrumb(classes, topicData.topic)}</Hidden>}
            {topicLoading ? <p>Loading</p> :
              topicError ? <></> : 
                <Grid item xs={12} sm={3}>
                  <TopicDetail data={topicData} />
                </Grid>
            }
            <Grid item xs={12} sm={9}>
              {topicData && <Hidden mdDown>{Breadcrumb(classes, topicData.topic)}</Hidden>}
              <TrackAttendee topicId={topicId} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout >
  );
};

export default TopicPage;
