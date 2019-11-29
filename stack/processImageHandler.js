

module.exports.index = async (event, context, callback) => {
    // dependencies
    var AWS = require('aws-sdk');

    // get reference to S3 client
    var s3 = new AWS.S3();
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

    // Read options from the event.
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    // Infer the image type.
    var typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
        callback("Could not determine the image type.");
        return;
    }
    
    var imageType = typeMatch[1].toLowerCase();
    if (imageType != "jpg" && imageType != "png") {
        callback(`Unsupported image type: ${imageType}`);
        return;
    }
    var params = {
        Image: {
            S3Object: {
                Bucket: srcBucket,
                Name: srcKey
            },
        },
    };
    var rekognition = new AWS.Rekognition();
    
    const data = await rekognition.detectText(params).promise();
    return extractTextInfo(data);
}