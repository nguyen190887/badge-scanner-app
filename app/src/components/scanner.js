import React from 'react';
import { processImage } from '../utils/rekognition';

const Scanner = () => {
  let imageFileRef = React.createRef();

  const handleSubmit = async e => {
    e.preventDefault();
    // TODO: add loading
    await processImage(imageFileRef.current.files[0], data => {
      alert(JSON.stringify(data));
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={imageFileRef} type="file" accept="image/*" capture="camera" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Scanner;
