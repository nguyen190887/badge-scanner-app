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
export const topic = `query Topic($topicId: Int!) {
  topic(topicId: $topicId) {
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
export const topicAttendance = `query TopicAttendance($topicId: Int!) {
  topicAttendance(topicId: $topicId) {
    topicId
    userId
    email
    imagePath
    rating
    comment
  }
}
`;
