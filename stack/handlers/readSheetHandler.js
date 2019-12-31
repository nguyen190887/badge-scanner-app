const GoogleSpreadsheet = require('google-spreadsheet');

const readTopics = async (doc) => {
  return new Promise(resolve => {
    doc.getRows(1, function (err, rows) {
      let response = [];
      rows.forEach(function (row) {
        response.push({
          topicId: row.no,
          date: row.date,
          name: row.name,
          owner: row.owner,
          status: row.status,
          smeGroup: row.smegroup,
          duration: row.duration,
          notes: row.notes,
        });
      });
      resolve(response.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
      }));
    });
  });
}

const readTopic = async (doc, args) => {
  return new Promise(resolve => {
    const { topicId } = args;
    doc.getRows(1, {
      query: `(no=${topicId})`
    }, function (err, rows) {
      if (rows) {
        resolve({
          topicId: rows[0].no,
          date: rows[0].date,
          name: rows[0].name,
          owner: rows[0].owner,
          status: rows[0].status,
          smeGroup: rows[0].smegroup,
          duration: rows[0].duration,
          notes: rows[0].notes,
        });
      }
      else {
        resolve({});
      }
    });
  });
}

const readTopicAttendance = async (doc = new GoogleSpreadsheet(), args) => {
  return new Promise(resolve => {
    const { topicId } = args;
    doc.getRows(2, {
      query: `(topicid=${topicId})`
    }, function (_err, rows) {
      console.info(rows);
      let response = [];
      rows.forEach(row => {
        response.push({
          topicId: row.topicid,
          userId: row.userid,
          userName: row.username,
          email: row.email,
          imagePath: row.imagepath,
          rating: row.rating,
          comment: row.comment,
          userName: row.username
        })
      });
      resolve(response);
    });
  });
}

const fieldMapping = {
  getAllTopics: readTopics,
  getTopic: readTopic,
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
