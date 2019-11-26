import AWS, { Rekognition } from 'aws-sdk';
import { currentSession } from './auth';
import {
  REGION,
  COGNITO_IDENTITYPOOL_ID,
  COGNITO_USERPOOL_ID,
} from '../constants';

const IMG_STANDARD_WIDTH = 1024;

const resizeImage = (file, width) => {
  const promise = new Promise(resolve => {
    const quality = 1;
    const mime = 'image/jpeg';

    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        if (width >= img.width) {
          resolve(event.target.result);
          return;
        }

        const height = (img.height / img.width) * width; // keep proportion
        console.log(`Resize ${img.width}:${img.height} -> ${width}:${height}`);
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.canvas.toDataURL(img, mime, quality);
        resolve(data);
      };
    };
    reader.onerror = error => console.log(error);
    reader.readAsDataURL(file);
  });
  return promise;
};

export const processImage = async (file, callback) => {
  await process(await resizeImage(file, IMG_STANDARD_WIDTH), callback);
  // var reader = new FileReader();
  // reader.onload = (() => {
  //   return async e => {
  //     await process(e.target.result, callback);
  //   };
  // })(file);
  // reader.readAsDataURL(file);
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
  const session = await currentSession();
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
  const idRegex = /ID[:\s]*([0-9]+)/;
  const exactIdRegex = /[0-9]{4}/;

  let detectedObj = {};
  textDetections
    .filter(item => item.Type === 'LINE')
    .forEach((item, index) => {
      const parsedArray = idRegex.exec(item.DetectedText);
      if (parsedArray && parsedArray.length > 1) {
        detectedObj.id = parsedArray[1];
        if (index > 0) {
          detectedObj.name = textDetections[index - 1].DetectedText;
        }
        return;
      }
    });
  
  if (!detectedObj.id) {
    detectedObj.id =
      textDetections
        .filter(item => item.Type === 'WORD' && exactIdRegex.test(item.DetectedText))
        .map(item => item.DetectedText)[0];
  }

  return detectedObj;
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
