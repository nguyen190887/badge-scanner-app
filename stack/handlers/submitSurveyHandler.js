const GoogleSpreadsheet = require('google-spreadsheet');

module.exports.index = async event => {
  console.log('Write Sheet Handler', event);
  var doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  var creds = {
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
  };

  console.log(event.queryStringParameters);

  return new Promise(resolve => {
    doc.useServiceAccountAuth(creds, function(err) {
      if (err) {
        console.log(err);
      }
      let { topicId, email, rating, comment, userId } = event.arguments;
      userId = "'" + ('0000' + userId).slice(-4);
      doc.getRows(
        2,
        {
          query: `(topicid=${topicId} and userid=${userId})`,
        },
        (_err, rows) => {
          console.log(rows);
          const row = rows.filter(x => x.userid === userid && x.topicid === topicId);
          if (row) {
            row.email = email;
            row.rating = rating;
            row.comment = comment;

            await row.save();
            resolve(row);
          }

          return row;
        }
      );
    });
  });
};
