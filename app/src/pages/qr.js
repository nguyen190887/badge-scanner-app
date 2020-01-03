import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { QRComponent, SEO, Layout, TopicListDense } from '../components';
import { allTopics } from '../graphql/queries';

const QRPage = () => {
  const { loading, error, data } = useQuery(gql`${allTopics}`);
  const [currentTopicId, setCurrentTopicId] = useState();

  return (
    <Layout>
      <SEO title="Ratings" />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Yes we need breadcrumb */}
          {/* {topicData && <Hidden mdUp>{Breadcrumb(classes, topicData.topic)}</Hidden>} */}
          {
            loading ? <p>Loading...</p> :
              error ? <></> :
                <TopicListDense topics={data} onClickHandler={setCurrentTopicId} />
          }
          <Grid item xs={12} sm={9}>
            <QRComponent topicId={currentTopicId} {...{ loading, error }} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default QRPage;
