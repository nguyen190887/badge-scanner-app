import React, { useEffect, useReducer, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import API, { graphqlOperation } from '@aws-amplify/api';
import { topicAttendance, topic } from '../graphql/queries';
import { onTrackingRowAdded } from '../graphql/subscriptions';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance, IdForm } from '../components';
import useAuth from '../utils/useAuth';

// const initialState = {
//   attendance: [],
//   loading: true,
//   error: false
// }
// // TODO: issue #20
// function reducer(state, action) {
//   switch (action.type) {
//     case 'fetchRowsSuccess':
//       return { ...state, attendance: action.attendance, loading: false }
//     case 'onTrackingRowAdded':
//       return { ...state, attendance: [action.row, ...state.attendance] }
//     case 'fetchRowsError':
//       return { ...state, loading: false, error: true }
//     default:
//       throw new Error();
//   }
// }

const TopicPage = (props) => {
  const { loggedIn } = useAuth();
  const topicId = props.id ? props.id : '';

  const { loading: topicLoading, error: topicError, data: topicData } = useQuery(gql`${topic}`,
    { variables: { id: topicId } }
  );

  const { subscribeToMore, loading: topicAttendanceLoading, error: topicAttendanceError, data: topicAttendanceData } = useQuery(gql`${topicAttendance}`,
    { variables: { id: topicId } }
  );

  const subscribeToNewRows = () =>
    subscribeToMore({
      document: onTrackingRowAdded,
      variables: { id: topicId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newRow = subscriptionData.data.onTrackingRowAdded;

        return Object.assign({}, prev, {
          topicAttendanceData: {
            topicAttendance: [newRow, ...prev.topicAttendance]
          }
        });
      }
    })

  useEffect(()=>{
    subscribeToNewRows();
  }, [])

  // return <h4>New comment: {!loading && commentAdded.content}</h4>;

  // const [rowsState, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const subscriber = API.graphql(graphqlOperation(onTrackingRowAdded, { id: topicId })).subscribe({
  //     next: data => {
  //       const newRowFromSub = data.value.data.onTrackingRowAdded
  //       dispatch({
  //         type: 'onTrackingRowAdded',
  //         row: newRowFromSub
  //       })
  //     }
  //   });
  //   return () => subscriber.unsubscribe()
  // }, [topicId])

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
            {loggedIn && <Scanner topicId={topic.no} />}
            <div>no luck! By keying ID</div>
            <IdForm topicId={topicId} />
          </fieldset>
          {topicAttendanceLoading ? <div>Loading</div> :
            topicAttendanceError ? <></> :
              topicAttendanceData &&
              <TopicAttendance data={topicAttendanceData} />
          }
        </>
      )}
    </Layout >
  );
};

export default TopicPage;
