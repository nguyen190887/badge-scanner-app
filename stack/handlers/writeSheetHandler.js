const { GoogleSpreadsheet } = require('google-spreadsheet');
const { mapAttendanceSheetRowToObject, mapTopicSheetRowToObject } = require('./utils');

const writeTrackingRow = async (doc, args) => {
  console.info(args);
  let { topicId, userId, userName = '', imagePath = '' } = args;
  userId = "'" + ("0000" + userId).slice(-4);

  const sheet = doc.sheetsByIndex[1];
  await sheet.addRow({
    'Topic ID': topicId,
    'User ID': userId,
    UserName: userName,
    ImagePath: imagePath,
  });
  return {
    topicId,
    userId: userId.slice(-4),
    userName,
    email: '',
    imagePath,
    rating: '',
    comment: ''
  };
};

const submitSurvey = async (doc, args) => {
  let { topicId, rating, comment, userId } = args;
  userId = ("0000" + userId).slice(-4);
  const sheet = doc.sheetsByIndex[1];
  const rows = await sheet.getRows();
  const row = rows.find(row => row['Topic ID'] === `${topicId}` && row['User ID'] === userId);

  if (row) {
    row.Rating = rating;
    row.Comment = comment;
    await row.save();
    return mapAttendanceSheetRowToObject(row);
  }
};

const writeTopic = async (doc, args) => {
  console.info(args);
  let { topicId = '', date = '', name = '', owner = '', status = '', smeGroup = '', duration = '', note = '' } = args;
  let result = {};

  const sheet = doc.sheetsByIndex[0];
  if (!topicId) {
     result = await sheet.addRow({
      No: '=generateTopicId(INDIRECT("R[-1]C[0]", FALSE))',
      Date: date,
      Name: name,
      Owner: owner,
      Status: status,
      'SME Group': smeGroup,
      Duration: duration,
      Notes: note
    }, { raw: false });

  }
  // await sheet.addRow({
    // 'Topic ID': topicId,
    // 'User ID': userId,
    // UserName: userName,
    // ImagePath: imagePath,
  // });
  return mapTopicSheetRowToObject(result);
};

const deleteTopic = async (doc, args) => {
  return true;
};

const fieldMapping = {
  addTrackingRow: writeTrackingRow,
  submitSurvey: submitSurvey,
  updateTopic: writeTopic,
  deleteTopic: deleteTopic
};

module.exports.index = async event => {
  console.log('Write Sheet Handler');
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
