import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Container from '@material-ui/core/Container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TopicList } from '../components/TopicList';
import { allTopics } from '../graphql/queries';

console.log('Index', new Date().toISOString());

const IndexPage = () => {
  const { loading, error, data } = useQuery(gql`${allTopics}`);
  return (
    <Layout>
      <SEO title="Home" />
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
