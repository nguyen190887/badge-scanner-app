import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';

const IndexPage = () => (
  <Layout>
    <SEO title="Scan your badge!" />
    <Scanner />
    <UserInfo />
  </Layout>
);

export default IndexPage;
