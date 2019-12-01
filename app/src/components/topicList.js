import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"


const TopicList = ({ data }) => {
  return (
    <table>
      <tr>
        <th>Date</th>
        <th>Topic</th>
        <th>Owner</th>
        <th>Status</th>
        <th>SME Group</th>
        <th>Duration</th>
        <th>Notes</th>
      </tr>
      {
        data && 
        data.topics.allTopics.map((topic, i) => (
          <tr key={topic.id}>
            <td>{topic.date}</td>
            <td>{topic.name}</td>
            <td>{topic.owner}</td>
            <td>{topic.status}</td>
            <td>{topic.smeGroup}</td>
            <td>{topic.duration}</td>
            <td>{topic.notes}</td>
            <td><Link to={`/topic/`} state={{ topic: topic }}>Detail</Link></td>
          </tr>
        ))
      }
    </table>
  )
}

export default TopicList;
