const AWS = require('aws-sdk');

const supportedTypes = ['jpg', 'jpeg', 'png'];
const sheetUpdatingLambda = process.env.SHEET_UPDATING_LAMBDA;
const region = process.env.AWS_REGION;

// get reference to S3 client
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
    detectedObj.id = textDetections
      .filter(
        item => item.Type === 'WORD' && exactIdRegex.test(item.DetectedText)
      )
      .map(item => item.DetectedText)[0];
  }
  return detectedObj;
};

const updateSheet = async (topicId, userId, userName, imagePath) => {
  var lambda = new AWS.Lambda({ region });

  const payload = {
    arguments: {
      id: topicId,
      userId,
      userName,
      imagePath,
    },
  };
  try {
    const data = await lambda
      .invoke({
        FunctionName: sheetUpdatingLambda,
        Payload: JSON.stringify(payload),
      })
      .promise();
    console.info('Invocation Response', data);
  } catch (err) {
    // advoid lambda execution retry
    console.error('Failed to invoke lambda', err);
  }
};

module.exports.index = async (event, context, callback) => {
  console.log('S3 object', event.Records[0].s3);

  // Read options from the event.
  const srcBucket = event.Records[0].s3.bucket.name;

  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  );

  const topicId = srcKey.split('~')[0];
  if (!topicId) {
    context.done('error', 'No topic id found in image file');
    return;
  }

  // Infer the image type.
  var typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    callback('Could not determine the image type.');
    return;
  }

  var imageType = typeMatch[1].toLowerCase();
  if (!supportedTypes.includes(imageType)) {
    callback(`Unsupported image type: ${imageType}`);
    return;
  }
  var params = {
    Image: {
      S3Object: {
        Bucket: srcBucket,
        Name: srcKey,
      },
    },
  };
  var rekognition = new AWS.Rekognition();

  const data = await rekognition.detectText(params).promise();
  const textInfo = extractTextInfo(data);
  console.info(textInfo);

  await updateSheet(topicId, textInfo.id, textInfo.name, srcKey);

  return textInfo;
};
