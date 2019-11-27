import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance } from '../components';
import useAuth from '../utils/useAuth';

console.log('Topic', new Date().toISOString());
const TopicPage = (props) => {
  const { loggedIn } = useAuth();

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      {loggedIn && <Scanner />}
      <UserInfo />
      <TopicDetail topic={props.location.state.topic} />
      <TopicAttendance />
    </Layout>
  )
};

export default TopicPage;
