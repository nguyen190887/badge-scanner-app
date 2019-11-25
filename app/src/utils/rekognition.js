import AWS, { Rekognition } from 'aws-sdk';
import { Auth } from 'aws-amplify';
import {
  REGION,
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_ID,
} from '../constants';

export const processImage = async (file, callback) => {
  var reader = new FileReader();
  reader.onload = (() => {
    return async e => {
      await process(e.target.result, callback);
    };
  })(file);
  reader.readAsDataURL(file);
};

const process = async (based64Image, callback) => {
  var image = null;
  var jpg = true;
  try {
    image = atob(based64Image.split('data:image/jpeg;base64,')[1]);
  } catch (e) {
    jpg = false;
  }
  if (!jpg) {
    try {
      image = atob(based64Image.split('data:image/png;base64,')[1]);
    } catch (e) {
      alert('Not an image file Rekognition can process');
      return;
    }
  }
  //unencode image bytes for Rekognition DetectFaces API
  const length = image.length;
  let imageBytes = new ArrayBuffer(length);
  let ua = new Uint8Array(imageBytes);
  for (let i = 0; i < length; i++) {
    ua[i] = image.charCodeAt(i);
  }
  //Call Rekognition
  await detechTexts(imageBytes, callback);
};

const callWithCredentials = async callback => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  const provider = `cognito-idp.${REGION}.amazonaws.com/${COGNITO_USERPOOL_ID}`;

  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: COGNITO_IDENTITYPOOL_ID,
    Logins: {
      [provider]: token,
    },
  });
  if (!(AWS.config.credentials.accessKeyId && session.isValid())) {
    AWS.config.credentials.get(function() {
      callback();
    });
  }
};

const extractTextInfo = data => {
  const textDetections = data.TextDetections || [];
  const idPrefix = 'ID:';

  textDetections.forEach((item, index) => {
    if (item.Type === 'LINE' && item.DetectedText.startsWith(idPrefix)) {
      const detectedObj = {};
      detectedObj.id = item.DetectedText.split(idPrefix)[1];
      if (index > 0) {
        detectedObj.name = textDetections[index - 1].DetectedText;
      }
      return detectedObj;
    }
  });
  return { error: 'ID not found' };
};

const detechTexts = async (imageData, callback) => {
  await callWithCredentials(() => {
    var rekognition = new Rekognition();
    var params = {
      Image: {
        Bytes: imageData,
      },
    };

    rekognition.detectText(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log('data', data);
        callback(extractTextInfo(data));
      }
    });
  });
};
