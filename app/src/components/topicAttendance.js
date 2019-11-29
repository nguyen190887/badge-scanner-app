import React from 'react';

const topicAttendance = ({ records }) => {
  let index = 1;
  return (
    <table>
      <tr>
        <th>No.</th>
        <th>ID</th>
        <th>Email</th>
        <th>ImagePath</th>
        <th>Rating</th>
        <th>Comment</th>
      </tr>
      {records &&
        records.map(r => (
          <tr>
            <td>{index++}</td>
            <td>{r.id}</td>
            <td>-</td>
            <td>{r.imagePath}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        ))}
    </table>
  );
};

export default topicAttendance;
