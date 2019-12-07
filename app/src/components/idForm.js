import React, { useRef } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { addTrackingRow } from '../graphql/mutations';

export default ({ topicId }) => {
  const inputRef = useRef(null);
  const userNameRef = useRef(null);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await API.graphql(
        graphqlOperation(addTrackingRow, {
          id: topicId,
          userId: inputRef.current.value,
          userName: userNameRef.current.value,
        })
      );
      inputRef.current.value = '';
      userNameRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} type="tel" placeholder="ID" />
      <input ref={userNameRef} type="text" placeholder="Username" />
      <button type="submit">Save</button>
    </form>
  );
};
