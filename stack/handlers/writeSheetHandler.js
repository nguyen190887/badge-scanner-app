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

  return new Promise(resolve => {
    doc.useServiceAccountAuth(creds, function (err) {
      if (err) {
        console.log(err);
      }
      let { id: topicid, userId: userid, userName: username, imagePath: imagepath } = event.arguments;
      userid = "'" + ("0000" + userid).slice(-4);
      doc.addRow(2, {
        topicid,
        userid,
        username,
        imagepath
      }, function (data) {
        console.info('Added', data);
        resolve({
          id: topicid,
          userId: userid.slice(-4),
          userName: username,
          email: '',
          imagePath: '',
          rating: '',
          comment: ''
        });
        return {};
      });
    });
  });
};
