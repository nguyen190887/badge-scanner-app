module.exports.index = async event => {
  console.log('Read Sheet Handler');
  try {
    var GoogleSpreadsheet = require('google-spreadsheet');
    // var creds = require('./google-service-credentials.json');
    var doc = new GoogleSpreadsheet('1-VB8_PDm15-TI1dmI--t5GLZtFYdKvCe0aaoSuOxT8M');
    var creds =
    {
      "private_key": process.env.PRIVATE_KEY,
      "client_email": process.env.CLIENT_EMAIL
    };

    var response = [];
    doc.useServiceAccountAuth(creds, function (err) {
      if (err) {
        console.log(err);
      }
      doc.getRows(1, function (err, rows) {
        rows.forEach(function (row) {
          response.push({
            no: row['no.'],
            date: row.date,
            name: row.name,
            owner: row.owner,
            status: row.status,
            smeGroup: row.smegroup,
            duration: row.duration,
            notes: row.notes
          })
        });
        console.log(response);
        return response;
      });
    });

  } catch (err) {
    console.log(err);
  }
};
