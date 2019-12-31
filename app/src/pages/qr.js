
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { QRGenerator, SEO, Layout, TopicListDense } from '../components';
import { allTopics } from '../graphql/queries';

const QRPage = () => {
  const { loading, error, data } = useQuery(gql`${allTopics}`);
  return (
    <Layout>
      <SEO title="Ratings" />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Yes we need breadcrumb */}
          {/* {topicData && <Hidden mdUp>{Breadcrumb(classes, topicData.topic)}</Hidden>} */}
          {
            loading ? <p>Loading...</p> :
              error ? <></> :
                <TopicListDense topics={data} />
          }
          <Grid item xs={12} sm={9}>
            <QRGenerator />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default QRPage;
