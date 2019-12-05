import React, { useEffect, useReducer } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { topicAttendance } from '../graphql/queries';
import { onTrackingRowAdded } from '../graphql/subscriptions';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Scanner from '../components/scanner';
import UserInfo from '../components/userInfo';
import { TopicDetail, TopicAttendance, IdForm } from '../components';
import useAuth from '../utils/useAuth';

const initialState = {
  attendance: [],
  loading: true,
  error: false
}
// TODO: issue #20
function reducer(state, action) {
  switch (action.type) {
    case 'fetchRowsSuccess':
      return { ...state, attendance: action.attendance, loading: false }
    case 'onTrackingRowAdded':
      return { ...state, attendance: [action.row, ...state.attendance] }
    case 'fetchRowsError':
      return { ...state, loading: false, error: true }
    default:
      throw new Error();
  }
}

async function fetchRows(dispatch, topicId) {
  try {
    const rowData = await API.graphql(graphqlOperation(topicAttendance, { id: topicId }))
    dispatch({
      type: 'fetchRowsSuccess',
      attendance: rowData.data.topicAttendance
    })
  } catch (err) {
    console.log('error fetching posts...: ', err)
    dispatch({
      type: 'fetchRowsError',
    })
  }
}

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

  const [rowsState, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchRows(dispatch, topic.no)
    const subscriber = API.graphql(graphqlOperation(onTrackingRowAdded, { id: topic.no })).subscribe({
      next: data => {
        const newRowFromSub = data.value.data.onTrackingRowAdded
        dispatch({
          type: 'onTrackingRowAdded',
          row: newRowFromSub
        })
      }
    });
    return () => subscriber.unsubscribe()
  }, [topic])

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
            {loggedIn && <Scanner topicId={topic.no} />}
            <div>no luck! By keying ID</div>
            <IdForm topicId={topic.no} />
          </fieldset>
          {rowsState.loading ? <div>Loading</div>
            : rowsState.attendance &&
            <TopicAttendance records={rowsState.attendance} />
          }
        </>
      )}
    </Layout>
  );
};

export default TopicPage;
