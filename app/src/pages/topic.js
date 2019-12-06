import React, { useEffect, useReducer, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { topicAttendance, topic } from '../graphql/queries';
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

async function fetchTopic(topicId, setTopic) {
  try {
    const data = await API.graphql(graphqlOperation(topic, { id: topicId }));
    setTopic({ data: data, loading: false, error: false });
  } catch (err) {
    setTopic({ loading: false, error: true });
  }
}

const TopicPage = (props) => {
  const { loggedIn } = useAuth();
  const topicId = props.id ? props.id : '';

  const [rowsState, dispatch] = useReducer(reducer, initialState);
  const [topicState, setTopic] = useState({
    data: {},
    loading: true,
    error: false,
  });

  useEffect(() => {
    fetchTopic(topicId, setTopic);
    fetchRows(dispatch, topicId);
    const subscriber = API.graphql(graphqlOperation(onTrackingRowAdded, { id: topicId })).subscribe({
      next: data => {
        const newRowFromSub = data.value.data.onTrackingRowAdded
        dispatch({
          type: 'onTrackingRowAdded',
          row: newRowFromSub
        })
      }
    });
    return () => subscriber.unsubscribe()
  }, [topicId])

  return (
    <Layout>
      <SEO title="Scan your badge!" />
      <UserInfo />

      {topicId && (
        <>
          {topicState.loading ? <p>Loading</p> :
            topicState.error ? <></> :
              <TopicDetail data={topicState.data} />}
          <fieldset>
            <legend>Track Attendees</legend>
            <div>by scanning ID Badge</div>
            {loggedIn && <Scanner />}
            <div>no luck! By keying ID</div>
            <IdForm topicId={topicId} />
          </fieldset>
          {rowsState.loading ? <div>Loading</div> :
            rowsState.error ? <></> :
              rowsState.attendance &&
              <TopicAttendance records={rowsState.attendance} />
          }
        </>
      )}
    </Layout>
  );
};

export default TopicPage;
