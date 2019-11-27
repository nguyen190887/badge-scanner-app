import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserInfo from '../components/userInfo';
import TopicList from '../components/topicList';

console.log('Index', new Date().toISOString());
const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Scan your badge!" />
    <UserInfo />
    <TopicList />
  </Layout>
)};

export default IndexPage;
