/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allPosts = `query AllPosts {
  allPosts {
    id
    title
  }
}
`;
export const allTopics = `query AllTopics {
  allTopics {
    no
    date
    name
    owner
    status
    smeGroup
    duration
    notes
  }
}
`;
export const topic = `query Topic($no: Int!) {
  topic(no: $no) {
    no
    date
    name
    owner
    status
    smeGroup
    duration
    notes
  }
}
`;
export const topicAttendance = `query TopicAttendance($id: Int!) {
  topicAttendance(id: $id) {
    id
    userId
    email
    imagePath
    rating
    comment
  }
}
`;
