import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { RatingSurvey } from '../components';

const RatingsPage = () => {
  return (
    <Layout>
      <SEO title="Ratings" />
      <RatingSurvey />
    </Layout>
  );
};

export default RatingsPage;
