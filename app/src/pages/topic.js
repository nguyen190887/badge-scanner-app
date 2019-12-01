import React from 'react';
import { graphqlOperation } from '@aws-amplify/api';
import * as queries from '../graphql/queries';
import { Connect } from 'aws-amplify-react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance, IdForm } from '../components';
import useAuth from '../utils/useAuth';

console.log('Topic', new Date().toISOString());
const mockData = [
  {
    id: '0123',
  },
  {
    imagePath: '1~IMG-001.jpg'
  }
];

const TopicPage = (props) => {
  const { loggedIn } = useAuth();
  const topic = props.location.state.topic;

  const saveId = id => {
    // todo save data
    console.info('save', id);
  };

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <UserInfo />
      <TopicDetail topic={topic} />

      <fieldset>
        <legend>Track Attendees</legend>
        <div>by scanning ID Badge</div>
        {loggedIn && <Scanner />}
        <div>no luck! By keying ID</div>
        <IdForm saveId={saveId} />
      </fieldset>
      <Connect query={graphqlOperation(queries.topicAttendance, { id: topic.no })}>
        {({ data: { topicAttendance }, loading, errors }) => {
          if (loading || !topicAttendance) return (<div>Loading</div>);
          return (
            <TopicAttendance records={topicAttendance} />
          );
        }}
      </Connect >
    </Layout>
  );
};

export default TopicPage;
