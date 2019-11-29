import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { callWithCredentials } from '../../utils/aws';
import { BUCKET } from '../../constants';

const Scanner = ({topicId, updateRecord}) => {
  const [loading, setLoading] = useState(false);
  let imageFileRef = React.createRef();

  const uploadFileToS3 = async file => {
   await callWithCredentials(() => {
      const s3 = new AWS.S3();
      const params = {
        Bucket: BUCKET,
        Key: `${topicId}~${file.name}`,
        Body: file
      };
      s3.upload(params, function(err, data){
        if (err) console.log(err, err.stack);
        else {
        //   alert(JSON.stringify(data.Location));
          updateRecord(data.Location);
          console.log(data);
          console.log(file);
        }
      });
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

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
