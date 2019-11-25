import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { getCurrentUser } from '../utils/auth';
import Scanner from '../components/scanner';

const IndexPage = () => (
  <Layout>
    <SEO title="Scan your badge!" />
    <Scanner />
    
    <Link to="/login/">Login</Link>
  </Layout>
);

export default IndexPage;
