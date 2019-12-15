import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from '@material-ui/core/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopicList from '../components/topicList';
import { allTopics } from '../graphql/queries';

console.log('Index', new Date().toISOString());

const IndexPage = () => {
  const { loading, error, data } = useQuery(gql`${allTopics}`);
  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <Container maxWidth="lg">
        {
          loading ? <p>Loading...</p> :
            error ? <></> :
              <TopicList topics={data} />
        }
      </Container>
    </Layout>
  )
};

export default IndexPage;
