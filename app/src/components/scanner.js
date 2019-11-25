import React, { useState } from 'react';
import { processImage } from '../utils/rekognition';

const Scanner = () => {
  const [loading, setLoading] = useState(false);
  let imageFileRef = React.createRef();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // TODO: add loading
    await processImage(imageFileRef.current.files[0], data => {
      setLoading(false);
      alert(JSON.stringify(data));
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input disabled={loading} ref={imageFileRef} type="file" accept="image/*" capture="camera" />
      <button disabled={loading} type="submit">Submit</button>
      <div>{ loading ? 'Processing ...' : ''}</div>
    </form>
  );
};

export default Scanner;
