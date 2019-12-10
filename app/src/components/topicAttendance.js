import React from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { topicAttendance } from '../graphql/queries';
import { addTrackingRow } from '../graphql/mutations';
import { IdForm } from '.';

const AttendanceTable = styled.div``;
const TableFunction = styled.div``;
const Table = styled.table`

`;

export default ({ topicId }) => {
  const { loading, error, data, refetch } = useQuery(gql`${topicAttendance}`,
    { variables: { topicId } }
  );

  const [addRow] = useMutation(gql`${addTrackingRow}`,
    {
      update(cache, { data: { addTrackingRow } }) {
        const data = cache.readQuery({ query: gql`${topicAttendance}`, variables: { topicId } });
        data.topicAttendance = [addTrackingRow, ...data.topicAttendance];
        cache.writeQuery({
          query: gql`${topicAttendance}`,
          variables: { topicId },
          data
        });
      },
    }
  );

  return (
    <>
      <IdForm topicId={topicId} addRow={addRow} />
      {loading ? <div>Loading...</div> :
        error ? <div>Error</div> :
          <AttendanceTable>
            <TableFunction>
              <button onClick={() => { refetch() }}>Refresh</button>
            </TableFunction>
            <Table>
              <tbody>
                <tr key='header'>
                  <th>No.</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>ImagePath</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
                {data && data.topicAttendance.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.userId}</td>
                    <td>{r.email}</td>
                    <td>{r.imagePath}</td>
                    <td>{r.rating}</td>
                    <td>{r.comment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </AttendanceTable>
      }
    </>
  );
};
