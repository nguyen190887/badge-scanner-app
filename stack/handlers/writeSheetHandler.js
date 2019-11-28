
module.exports.index = async (event) => {
  console.log('Write Sheet Handler');
  try {
    var GoogleSpreadsheet = require('google-spreadsheet');
    // var creds = require('./google-service-credentials.json');
    var doc = new GoogleSpreadsheet('1-VB8_PDm15-TI1dmI--t5GLZtFYdKvCe0aaoSuOxT8M');
    var creds =
    {
      "private_key": process.env.PRIVATE_KEY,
      "client_email": process.env.CLIENT_EMAIL
    };

    console.log(event.queryStringParameters);

    doc.useServiceAccountAuth(creds, function (err) {
      if (err) {
        console.log(err);
      }
      doc.addRow(2, {
        topic: event.queryStringParameters.topic,
        userid: event.queryStringParameters.userid,
      }, function () {
        return {};
      });
    });

  } catch (err) {
    console.log(err);
  }
};
