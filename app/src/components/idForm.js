import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { addTrackingRow } from '../graphql/mutations';

export default ({ topicId }) => {
  const inputRef = useRef(null);
  const [addRow] = useMutation(gql`${addTrackingRow}`);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      addRow({ variables: { topicId, userId: inputRef.current.value } })
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
