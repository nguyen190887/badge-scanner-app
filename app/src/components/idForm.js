import React, { useRef } from 'react';
// import API, { graphqlOperation } from '@aws-amplify/api';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { addTrackingRow } from '../graphql/mutations';

export default ({ topicId }) => {
  const inputRef = useRef(null);
  const [addRow, { data }] = useMutation(gql`${addTrackingRow}`);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // await API.graphql(graphqlOperation(addTrackingRow, { id: topicId, userId: inputRef.current.value }))
      addRow({ variables: { id: topicId, userId: inputRef.current.value } })
      inputRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} type="tel" />
      <button type="submit">Save</button>
    </form>
  );
};
