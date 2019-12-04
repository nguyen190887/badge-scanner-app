import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { callWithCredentials } from '../utils/aws';
import { IMAGE_BUCKET } from '../constants';
import { resizeImage } from '../utils/common';

const Scanner = () => {
  const [loading, setLoading] = useState(false);
  let imageFileRef = React.createRef();

  const uploadFileToS3 = async (fileName, file) => {
    // TODO: FIXME - not work
    await callWithCredentials(() => {
      const s3 = new AWS.S3();
      const params = {
        Bucket: IMAGE_BUCKET,
        Key: fileName,
        Body: file,
      };
      s3.upload(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
          alert(JSON.stringify(data.Location));
        }
      });
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // upload file to S3
    try {
      console.log(imageFileRef.current.files[0]);
      const fileName = imageFileRef.current.files[0].name;
      // TODO: output current function is invalid format
      // const resizedImgFile = await resizeImage(
      //   imageFileRef.current.files[0],
      //   800
      // );
      await uploadFileToS3(fileName, imageFileRef.current.files[0]);
    } catch (err) {
      console.error('Failed to upload', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        disabled={loading}
        ref={imageFileRef}
        type="file"
        accept="image/*"
        capture="camera"
      />
      <button disabled={loading} type="submit">
        Submit
      </button>
      <div>{loading ? 'Processing ...' : ''}</div>
    </form>
  );
};

export default Scanner;
