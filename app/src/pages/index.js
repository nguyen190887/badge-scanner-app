import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import TopicList from '../components/topicList';

console.log('Index', new Date().toISOString());
const IndexPage = () => (
  <Layout>
    <SEO title="Scan your badge!" />
    <Scanner />
    <UserInfo />
    <TopicList />
  </Layout>
);

export default IndexPage;
