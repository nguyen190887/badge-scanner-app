const GoogleSpreadsheet = require('google-spreadsheet');

module.exports.index = async event => {
  console.log('Read Sheet Handler');
  console.log(event);

  var doc = new GoogleSpreadsheet(
    process.env.SHEET_ID
  );
  var creds = {
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
  };

  var response = [];
  const promise = new Promise(resolve => {
    doc.useServiceAccountAuth(creds, function(err) {
      if (err) {
        console.error(err);
      }
      doc.getRows(1, function(err, rows) {
        rows.forEach(function(row) {
          response.push({
            no: row['no.'],
            date: row.date,
            name: row.name,
            owner: row.owner,
            status: row.status,
            smeGroup: row.smegroup,
            duration: row.duration,
            notes: row.notes,
          });
        });
        resolve(response);
      });
    });
  });
  return promise;
};
