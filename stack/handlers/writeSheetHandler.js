const GoogleSpreadsheet = require('google-spreadsheet');

module.exports.index = async (event) => {
  console.log('Write Sheet Handler', event);
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
        const {topic: topicid, userId: userid} = event.arguments;
        doc.addRow(2, {
          topicid,
          userid,
        }, function (data) {
          console.info('Added', data);
          resolve({
            id: 0
          }); //todo
          return {};
        });
      });
    });
    return promise;
};
