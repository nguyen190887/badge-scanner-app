import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export const topicRowQuery = graphql`
  query RowsQuery {
    allGoogleSheetTopicsRow {
      edges {
        node {
          no
          date
          name
          owner
          status
          smegroup
          duration
          notes
        }
      }
    }
  }
`;

const TopicList = () => {
  const data = useStaticQuery(topicRowQuery)
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
        data.allGoogleSheetTopicsRow.edges.map((d, i) => (
          <tr key={d.node.id}>
            <td>{d.node.date}</td>
            <td>{d.node.name}</td>
            <td>{d.node.owner}</td>
            <td>{d.node.status}</td>
            <td>{d.node.smegroup}</td>
            <td>{d.node.duration}</td>
            <td>{d.node.notes}</td>
            <td><Link to={`/topic/`} state={{ topic: d.node }}>Detail</Link></td>
          </tr>
        ))
      }
    </table>
  )
}

export default TopicList;
