import React, { useState } from 'react';
import Scanner from './scanner';

const TopicDetail = ({topicId}) => {
  const [records, setRecords] = useState([]);
  let index = 1;

  const updateRecord = imagePath => {
    setRecords([...records, { imagePath }]);
  };

  return (
    <>
      <Scanner topicId={topicId} updateRecord={updateRecord} />
      <table>
        <th>
          <td>No.</td>
          <td>ID</td>
          <td>Image Path</td>
        </th>
        {records &&
          records.map(r => (
            <tr>
              <td>{index++}</td>
              <td>{r.id}</td>
              <td>{r.imagePath}</td>
            </tr>
          ))}
      </table>
    </>
  );
};

export default TopicDetail;
