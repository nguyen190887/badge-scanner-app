import React from 'react';
import { Link } from 'gatsby';
import { StyledTable, Header, Row } from './table';

const TopicList = ({ topics: { data: { allTopics = {} } = {} } = {} }) => {
  return (
    <StyledTable className='topic-table'>
      <tbody>
        <Header>
          <th>Date</th>
          <th>Topic</th>
          <th>Owner</th>
          <th>Status</th>
          <th>SME Group</th>
          <th>Duration</th>
          <th>Notes</th>
          <th />
        </Header>
        {
          allTopics.map((topic) => (
            <Row key={topic.no}>
              <td>{topic.date}</td>
              <td>{topic.name}</td>
              <td>{topic.owner}</td>
              <td>{topic.status}</td>
              <td>{topic.smeGroup}</td>
              <td>{topic.duration}</td>
              <td>{topic.notes}</td>
              <td><Link to={`/topic/${topic.no}`}>Detail</Link></td>
            </Row>
          ))
        }
      </tbody>
    </StyledTable>
  )
}

export default TopicList;
