/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addTrackingRow = `mutation AddTrackingRow($id: Int!, $userId: String!, $userName: String) {
  addTrackingRow(id: $id, userId: $userId, userName: $userName) {
    id
    userId
    email
    imagePath
    rating
    comment
    userName
  }
}
`;

export const submitSurvey = `mutation SubmitSurvey($topicId: Int!, $email: String!, $rating: String!, $comment: String!) {
  submitSurvey(topicId: $topicId, email: $email, rating: $rating, comment: $comment) {
    topicId
    email
    rating
    comment
  }
}`;
