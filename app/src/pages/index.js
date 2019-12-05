import React, { useState, useEffect } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserInfo from '../components/userInfo';
import TopicList from '../components/topicList';
import { allTopics } from '../graphql/queries';

console.log('Index', new Date().toISOString());

async function fetchTopics(setTopics) {
  const data = await API.graphql(graphqlOperation(allTopics));
  setTopics({ topics: data, loading: false });
}

const IndexPage = () => {
  const [topicsState, setTopics] = useState({
    topics: [],
    loading: true,
  });
  useEffect(() => {
    fetchTopics(setTopics);
  }, [])
  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <UserInfo />
      {topicsState.loading ? <div>Loading</div> :
        <TopicList topics={topicsState.topics} />
      }
    </Layout>
  )
};

export default IndexPage;
