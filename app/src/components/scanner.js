import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import { callWithCredentials } from '../utils/aws';
import { IMAGE_BUCKET } from '../constants';
import { resizeImage } from '../utils/common';

const maxImageWidth = 800;

const Scanner = ({topicId}) => {
  const [loading, setLoading] = useState(false);
  const imageFileRef = useRef(null);

  const uploadFileToS3 = async (fileName, file) => {
    await callWithCredentials(() => {
      const s3 = new AWS.S3();
      const params = {
        Bucket: IMAGE_BUCKET,
        Key: `${topicId}~${fileName}`,
        Body: file,
      };
      s3.upload(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
          setLoading(false); // todo: set loading separately
          console.log(JSON.stringify(data.Location));
        }
      });
    });
  };

  const handleFileUpload = async e => {
    try {
      setLoading(true);
      console.log(imageFileRef.current.files[0]);
      const fileName = imageFileRef.current.files[0].name;
      const resizedImgFile = await resizeImage(
        imageFileRef.current.files[0],
        maxImageWidth
      );
      imageFileRef.current.value = '';
      await uploadFileToS3(fileName, resizedImgFile);
    } catch (err) {
      console.error('Failed to upload', err);
    }
  };

  return (
    <form>
      <input
        ref={imageFileRef}
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleFileUpload}
      />
      <div>{loading ? 'Processing ...' : ''}</div>
    </form>
  );
};

export default Scanner;
