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
      userId = parseInt(userId) < 1000 ? '0' + userId : userId;
      doc.getRows(
        2,
        {
          query: `(topicid=${topicId})`,
        },
        async (_err, rows) => {
          const row = rows && rows.find(x => x.userid === userId);
          console.info('rows', rows);
          console.info('row', row);
          console.log('userId', userId);
          console.log('topicId', topicId);

          if (row) {
            row.email = email;
            row.rating = rating;
            row.comment = comment;
            row.userid = "'" + ('0000' + userId).slice(-4);

            await row.save();

            // resolve({
            //   topicId: row.topicid,
            //   userId: userId,
            //   userName: row.username,
            //   email: row.email,
            //   imagePath: row.imagepath,
            //   rating: row.rating,
            //   comment: row.comment,
            // });

            resolve(row);
          }

          return row || null;
        }
      );
    });
  });
};
