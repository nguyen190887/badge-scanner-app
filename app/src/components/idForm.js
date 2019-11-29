import React, { useState } from 'react';

export default ({ saveId }) => {
  const [id, setId] = useState('');

  const onSubmit = e =>{
      e.preventDefault();
      saveId(id);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="tel" onChange={e => setId(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};
