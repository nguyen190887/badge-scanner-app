import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import UserInfo from '../components/userInfo';
import TopicDetail from '../components/TopicDetail';

const getTopicId = location => {
    // console.log(location);
    if (location.search) {
        return location.search.split('id=')[1];
    }
    return -1;
}

const TopicDetailPage = ({location}) => (
  <Layout>
    <SEO title="Scan your badge!" />

    <TopicDetail topicId={getTopicId(location)} />

    <UserInfo />
  </Layout>
);

export default TopicDetailPage;
