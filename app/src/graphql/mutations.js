/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const submitSurvey = `mutation SubmitSurvey(
  $topicId: String!
  $rating: String!
  $comment: String!
  $userId: String!
  $email: String
) {
  submitSurvey(
    topicId: $topicId
    rating: $rating
    comment: $comment
    userId: $userId
    email: $email
  ) {
    topicId
    userId
    email
    imagePath
    rating
    comment
    userName
  }
}
`;
export const addTrackingRow = `mutation AddTrackingRow($topicId: Int!, $userId: String!, $userName: String) {
  addTrackingRow(topicId: $topicId, userId: $userId, userName: $userName) {
    topicId
    userId
    email
    imagePath
    rating
    comment
    userName
  }
}
`;
export const addTrackingRowWithPhoto = `mutation AddTrackingRowWithPhoto($srcBucket: String!, $srcKey: String!) {
  addTrackingRowWithPhoto(srcBucket: $srcBucket, srcKey: $srcKey) {
    topicId
    userId
    email
    imagePath
    rating
    comment
    userName
  }
}
`;
export const updateTopic = `mutation UpdateTopic(
  $topicId: Int
  $date: String
  $name: String
  $owner: String
  $status: String
  $smeGroup: String
  $duration: String
  $note: String
) {
  updateTopic(
    topicId: $topicId
    date: $date
    name: $name
    owner: $owner
    status: $status
    smeGroup: $smeGroup
    duration: $duration
    note: $note
  ) {
    topicId
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
export const deleteTopic = `mutation DeleteTopic($topicId: Int!) {
  deleteTopic(topicId: $topicId)
}
`;
