import React from 'react';
import { graphqlOperation } from '@aws-amplify/api';
import { topicAttendance } from '../graphql/queries';
import { onTrackingRowAdded } from '../graphql/subscriptions';
import { addTrackingRow } from '../graphql/mutations';
import { Connect } from 'aws-amplify-react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance, IdForm } from '../components';
import useAuth from '../utils/useAuth';

const TopicPage = (props) => {
  const { loggedIn } = useAuth();
  const topic = props.location && props.location.state && props.location.state.topic; // todo: fix this to use route

  // todo: use later
  // const getTopicId = location => {
  //     // console.log(location);
  //     if (location.search) {
  //         return location.search.split('id=')[1];
  //     }
  //     return -1;
  // }

  const saveId = id => {
    // todo save data
    console.info('save', id);
  };

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <UserInfo />

      {topic && (
        <>
          <TopicDetail topic={topic} />
          <fieldset>
            <legend>Track Attendees</legend>
            <div>by scanning ID Badge</div>
            {loggedIn && <Scanner />}
            <div>no luck! By keying ID</div>
            <Connect mutation={graphqlOperation(addTrackingRow)}>
              {({ mutation }) => (
                <IdForm onCreate={mutation} topicId={topic.no} />
              )}
            </Connect>
          </fieldset>
          <Connect query={graphqlOperation(topicAttendance, { id: topic.no })}
            subscription={graphqlOperation(onTrackingRowAdded, { id: topic.no })}
            onSubscriptionMsg={(prev, data) => {
              console.log(data.onTrackingRowAdded);
              return {
                topicAttendance: [...prev.topicAttendance, data.onTrackingRowAdded],
              }
            }}
          >
            {({ data: { topicAttendance }, loading, errors }) => {
              if (loading || !topicAttendance) return (<div>Loading</div>);
              return (
                <TopicAttendance records={topicAttendance} />
              );
            }}
          </Connect >
        </>
      )}
    </Layout>
  );
};

export default TopicPage;
