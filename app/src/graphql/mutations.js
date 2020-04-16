/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const submitSurvey = `mutation SubmitSurvey(
  $topicId: Int!
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
