import React, { useRef } from 'react';

export default ({ topicId, addRow }) => {
  const inputRef = useRef(null);

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
