const { GoogleSpreadsheet } = require('google-spreadsheet');

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
    return {
      topicId: row['Topic ID'],
      userId: row['User ID'],
      userName: row.UserName,
      email: row.Email,
      imagePath: row.ImagePath,
      rating: row.Rating,
      comment: row.Comment,
    };
  }
};

const fieldMapping = {
  addTrackingRow: writeTrackingRow,
  submitSurvey: submitSurvey
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
