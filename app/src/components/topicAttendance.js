import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { topicAttendance } from '../graphql/queries';
import { onTrackingRowAdded } from '../graphql/subscriptions';

export default ({ topicId }) => {
  const { loading, error, data, subscribeToMore } = useQuery(gql`${topicAttendance}`,
    { variables: { topicId } }
  );

  const subscribe = () =>
    subscribeToMore({
      document: gql`${onTrackingRowAdded}`,
      variables: { topicId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newRow = subscriptionData.data.onTrackingRowAdded;
        if (prev.topicAttendance.find(e => e.userId === newRow.userId)) {
          return prev;
        }

        return Object.assign({}, prev, {
          topicAttendance: [newRow, ...prev.topicAttendance]
        });
      }
    })

  useEffect(() => {
    subscribe();
  }, [topicId])

  return (
    <>
      {loading ? <div>Loading...</div> :
        error ? <div>Error</div> :
          <table>
            <tbody>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Email</th>
                <th>ImagePath</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
              {data && data.topicAttendance && data.topicAttendance.map((r, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{r.userId}</td>
                  <td>{r.email}</td>
                  <td>{r.imagePath}</td>
                  <td>{r.rating}</td>
                  <td>{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  );
};
