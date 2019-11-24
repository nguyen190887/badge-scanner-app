import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { getCurrentUser } from '../utils/auth';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi {getCurrentUser().username}</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/login/">Login</Link>
  </Layout>
);

export default IndexPage;
