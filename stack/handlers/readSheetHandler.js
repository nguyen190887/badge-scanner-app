const GoogleSpreadsheet = require('google-spreadsheet');

const readTopics = async (doc) => {
  return new Promise(resolve => {
    doc.getRows(1, function (err, rows) {
      let response = [];
      rows.forEach(function (row) {
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
}

const readTopicAttendance = async (doc = new GoogleSpreadsheet(), args) => {
  return new Promise(resolve => {
    const { id } = args;
    doc.getRows(2, {
      query: `(topicid=${id})`
    }, function (_err, rows) {
      console.info(rows);
      let response = [];
      rows.forEach(row => {
        response.push({
          id: row.topicid,
          userId: row.userid,
          email: row.email,
          imagePath: row.imagepath,
          rating: row.rating,
          comment: row.comment
        })
      });
      resolve(response);
    });
  });
}

const fieldMapping = {
  getAllTopics: readTopics,
  getTopicAttendance: readTopicAttendance
};

module.exports.index = async event => {
  console.log('Read Sheet Handler');
  console.log(event.field);

  var doc = new GoogleSpreadsheet(
    process.env.SHEET_ID
  );
  var creds = {
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
  };

  const promise = new Promise(resolve => {
    doc.useServiceAccountAuth(creds, async function (err) {
      if (err) {
        console.error(err);
      }

      if (fieldMapping[event.field]) {
        resolve(await fieldMapping[event.field](doc, event.arguments));
        return;
      }

      resolve([]);
    });
  });
  return promise;
};
