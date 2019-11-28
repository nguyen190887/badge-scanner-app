
import React from "react"
// import { useStaticQuery, graphql, Link } from "gatsby"

const Detail = ({ topic }) => {
  return (
    <div key={topic.id}>
      <div>{topic.date}</div>
      <div>{topic.name}</div>
      <div>{topic.owner}</div>
      <div>{topic.status}</div>
      <div>{topic.smegroup}</div>
      <div>{topic.duration}</div>
      <div>{topic.notes}</div>
    </div>
  )
}

export default Detail;
