import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { topic } from '../graphql/queries';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance, IdForm } from '../components';
import useAuth from '../utils/useAuth';

const TopicPage = (props) => {
  const { loggedIn } = useAuth();
  const topicId = props.id ? props.id : '';

  const { loading: topicLoading, error: topicError, data: topicData } = useQuery(gql`${topic}`,
    { variables: { topicId } }
  );

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <UserInfo />

      {topicId && (
        <>
          {topicLoading ? <p>Loading</p> :
            topicError ? <></> :
              <TopicDetail data={topicData} />}
          <fieldset>
            <legend>Track Attendees</legend>
            <div>by scanning ID Badge</div>
            {loggedIn && <Scanner topicId={topic.topicId} />}
            <div>no luck! By keying ID</div>
            <IdForm topicId={topicId} />
          </fieldset>
          <TopicAttendance topicId={topicId} />
        </>
      )}
    </Layout >
  );
};

export default TopicPage;
