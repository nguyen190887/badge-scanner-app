import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { processImage, callWithCredentials } from '../utils/rekognition';
import { REGION, BUCKET } from '../constants';

const Scanner = () => {
  const [loading, setLoading] = useState(false);
  let imageFileRef = React.createRef();

  const uploadFileToS3 = async file => {
   await callWithCredentials(() => {
      const s3 = new AWS.S3();
      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file
      };
      s3.upload(params, function(err, data){
        if (err) console.log(err, err.stack);
        else {
          alert(JSON.stringify(data.Location));
          console.log(data);
          console.log(file);
        }
      });
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // TODO: add loading, move it to lambda
    await processImage(imageFileRef.current.files[0], data => {
      setLoading(false);
      alert(JSON.stringify(data));
    });
    // upload file to S3
    await uploadFileToS3(imageFileRef.current.files[0]);
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
