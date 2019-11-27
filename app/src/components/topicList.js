import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const TopicList = () => {
  const data = useStaticQuery(graphql`
    query RowsQuery {
      allGoogleSheetTopicsRow {
        edges {
          node {
            name
            owner
          }
        }
      }
    }
  `)
  return (
    // <table>
    //   <tbody>
    <>
        {
          data.allGoogleSheetTopicsRow.edges.map((d, i) => (
            <div>{d.node.name && d.node.name}</div>
          ))
        }
     </>
    //   </tbody>
    // </table>
  )
}

export default TopicList;
