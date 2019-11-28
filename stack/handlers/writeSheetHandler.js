const GoogleSpreadsheet = require('google-spreadsheet');

module.exports.index = async (event) => {
  console.log('Write Sheet Handler');
    var doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    var creds =
    {
      "private_key": process.env.PRIVATE_KEY,
      "client_email": process.env.CLIENT_EMAIL
    };

    console.log(event.queryStringParameters);

    const promise = new Promise(resolve => {
      doc.useServiceAccountAuth(creds, function (err) {
        if (err) {
          console.log(err);
        }
        doc.addRow(2, {
          topic: event.queryStringParameters.topic,
          userid: event.queryStringParameters.userid,
        }, function () {
          resolve({}); //todo
          return {};
        });
      });
    });
    return promise;
};
