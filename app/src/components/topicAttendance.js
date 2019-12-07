import React from 'react';

const topicAttendance = ({ records }) => {
  let index = 1;
  console.log(records);
  return (
    <table>
      <tbody>
        <tr>
          <th>No.</th>
          <th>ID</th>
          <th>Email</th>
          <th>Name</th>
          <th>ImagePath</th>
          <th>Rating</th>
          <th>Comment</th>
        </tr>
        {records &&
          records.map(r => (
            <tr>
              <td>{index++}</td>
              <td>{r.userId}</td>
              <td>{r.email}</td>
              <td>{r.userName}</td>
              <td>{r.imagePath}</td>
              <td>{r.rating}</td>
              <td>{r.comment}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default topicAttendance;
