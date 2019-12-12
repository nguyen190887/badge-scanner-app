import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { callWithCredentials } from '../utils/aws';
import { IMAGE_BUCKET } from '../constants';
import { resizeImage } from '../utils/common';

const maxImageWidth = 800;

const Scanner = ({ topicId, addRow }) => {
  const [loading, setLoading] = useState(false);
  const imageFileRef = useRef(null);

  const uploadFileToS3 = async (fileName, file) => {
    // TODO: FIXME - not work
    return new Promise(resolve => {
      callWithCredentials(() => {
        const s3 = new AWS.S3();
        const params = {
          Bucket: IMAGE_BUCKET,
          Key: `${topicId}~${fileName}`,
          Body: file,
        };
        s3.upload(params, function (err, data) {
          if (err) console.log(err, err.stack);
          else {
            // setLoading(false);
            if (imageFileRef && imageFileRef.current) {
              imageFileRef.current.value = '';
            }
            resolve(data);
          }
        });
      })
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
      const result = await uploadFileToS3(fileName, resizedImgFile);
      console.log(result);
      addRow({ variables: { srcBucket: result.Bucket, srcKey: result.Key } });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Failed to upload', err);
    }
  };

  return (
    <form>
      <input
        style={{ display: 'none' }}
        id="raised-button-file"
        accept="image/*"
        capture="camera"
        type="file"
        disabled={loading}
        ref={imageFileRef}
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" color='secondary' disabled={loading}>
          Scanning ID Badge
        </Button>
      </label>
      <div>{loading ? 'Processing ...' : ''}</div>
    </form>
  );
};

export default Scanner;
