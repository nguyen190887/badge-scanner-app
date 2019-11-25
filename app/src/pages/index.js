import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';

console.log('Index', new Date().toISOString());
const IndexPage = () => (
  <Layout>
    <SEO title="Scan your badge!" />
    <Scanner />
    <UserInfo />
  </Layout>
);

export default IndexPage;
