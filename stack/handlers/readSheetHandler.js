const { GoogleSpreadsheet } = require('google-spreadsheet');

const readTopics = async (doc) => {
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const result = [];
  rows.forEach(row => result.push({
    topicId: row.No,
    date: row.Date,
    name: row.Name,
    owner: row.Owner,
    status: row.Status,
    smeGroup: row['SME Group'],
    duration: row.Duration,
    notes: row.Notes,
  }))
  result.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return result;
};

const readTopic = async (doc, args) => {
  const { topicId } = args;
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const row = rows.find(row => row.No === `${topicId}`);
  return {
    topicId: row.No,
    date: row.Date,
    name: row.Name,
    owner: row.Owner,
    status: row.Status,
    smeGroup: row['SME Group'],
    duration: row.Duration,
    notes: row.Notes,
  };
};

// TODO: limit fetched row with each requests
const readTopicAttendance = async (doc, args) => {
  const { topicId } = args;
  const sheet = doc.sheetsByIndex[1];
  const rows = await sheet.getRows();
  const attendance = rows.filter(row => row['Topic ID'] === `${topicId}`);
  const result = [];
  attendance.forEach(row => result.push({
    topicId: row['Topic ID'],
    userId: row['User ID'],
    userName: row.UserName,
    email: row.Email,
    imagePath: row.ImagePath,
    rating: row.Rating,
    comment: row.Comment,
  }));
  return result;
};

const fieldMapping = {
  getAllTopics: readTopics,
  getTopic: readTopic,
  getTopicAttendance: readTopicAttendance
};

module.exports.index = async event => {
  console.log('Read Sheet Handler');
  console.log(event.field);

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  const creds = {
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
  };
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  if (fieldMapping[event.field]) {
    return await fieldMapping[event.field](doc, event.arguments);
  }
};
