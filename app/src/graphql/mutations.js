/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
