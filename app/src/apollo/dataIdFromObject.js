import { defaultDataIdFromObject } from 'apollo-cache-inmemory';

export default (object) => {
  switch (object.__typename) {
    case 'Topic':
      return `Topic:${object.topicId}`;
    case 'TrackingRow':
      return `TrackingRow:${object.topicId}:${object.userId}:${object.userName}`
    default:
      return defaultDataIdFromObject(object);
  }
};
