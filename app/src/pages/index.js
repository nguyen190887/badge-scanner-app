import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import { isLoggedIn } from '../utils/auth';

const IndexPage = () => (
  <Layout>
    <SEO title="Scan your badge!" />
    <Scanner />
    {isLoggedIn ? <></> : <Link to="/login/">Login</Link>}
  </Layout>
);

export default IndexPage;
