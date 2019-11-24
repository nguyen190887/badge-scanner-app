"use strict";

const { Rekognition } = require("aws-sdk");
const rekonigtion = new Rekognition();

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

const atob = (b64Encoded) => Buffer.from(b64Encoded, 'base64').toString();

const convertImage = rawData => {
  var image = null;
  // img.src = e.target.result;
  var jpg = true;
  try {
    image = atob(rawData.split("data:image/jpeg;base64,")[1]);
  } catch (e) {
    console.error(e);
    jpg = false;
  }
  if (jpg == false) {
    try {
      image = atob(rawData.split("data:image/png;base64,")[1]);
    } catch (e) {
      console.error(e);
      console.log("Not an image file Rekognition can process");
      return;
    }
  }
  // console.log('image', image);
  //unencode image bytes for Rekognition DetectFaces API
  const length = image.length;
  let imageBytes = new ArrayBuffer(length);
  let ua = new Uint8Array(imageBytes);
  for (let i = 0; i < length; i++) {
    ua[i] = image.charCodeAt(i);
  }
  return imageBytes;
};

// export async function index(event) {
module.exports.index = async event => {
  console.log('Event', event);
  // const parsedData = JSON.parse(event.body);
  // console.log('parsed data', parsedData)

  // console.log(event.body);
  // const buffer = new Buffer(event.body);
  // const bytes = buffer.toString('base64');
  // const bytes = toArrayBuffer(buffer);
  // const bytes = new Buffer(event.body, 'binary');
  // const bytes = Buffer.from(event.body, 'binary');
  // console.log(bytes.toString('base64'));

  // const data = multipart.parse(event);
  // console.log(data);

  // fs.createWriteStream('test.jpg').write(new Buffer(event.body));
  // fs.createWriteStream('test.jpg').write(data.File.content);

  // for (let key in data.File) {
  //   console.log(key);
  // }

  // const bytes = new Buffer(event.body);
  // const bytes = convertImage(event.body);
  const base64Image = event.body.split("data:image/jpeg;base64,")[1];
  console.log('base64', base64Image);
  // if (bytes) {
    const params = {
      Image: {
        Bytes: convertImage(event.body) // base64Image //bytes
      }
    };
    const response = await rekonigtion.detectText(params).promise();
    console.log(response);
  // }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!"
      },
      null,
      2
    )
  };
};
