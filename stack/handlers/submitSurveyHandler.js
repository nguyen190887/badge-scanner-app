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
    doc.useServiceAccountAuth(creds, function (err) {
      if (err) {
        console.log(err);
      }
      let { topicId, email, rating, comment, userId } = event.arguments;
      userId = ("0000" + userId).slice(-4);
      doc.getRows(
        2,
        {
          query: `(topicid=${topicId})`,
        }, function (err, rows) {
          const row = rows && rows.find(x => x.userid === userId);

          if (row) {
            row.userid = `'${userId}`;
            row.rating = rating;
            row.comment = comment;

            row.save(function () {
              console.info('row', row);
              resolve({
                topicId: row.topicid,
                userId: row.userid.slice(-4),
                userName: row.username,
                email: row.email,
                imagePath: row.imagepath,
                rating: row.rating,
                comment: row.comment
              });
            });
          }
          else {
            resolve({});
          }
        }
      );
    });
  });
};
