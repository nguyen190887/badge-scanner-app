import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { topic } from '../graphql/queries';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TopicDetail, TrackAttendee } from '../components';

const TopicPage = (props) => {
  const topicId = props.id ? props.id : '';

  const { loading: topicLoading, error: topicError, data: topicData } = useQuery(gql`${topic}`,
    { variables: { topicId } }
  );

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <Container maxWidth='xl'>
        {topicId && (
          <Grid container spacing={2}>
            {topicLoading ? <p>Loading</p> :
              topicError ? <></> :
                <Grid item xs={12} sm={3}>
                  <TopicDetail data={topicData} />
                </Grid>
            }
            <Grid item xs={12} sm={9}>
              <TrackAttendee topicId={topicId} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout >
  );
};

export default TopicPage;
