const { GoogleSpreadsheet } = require('google-spreadsheet');

const writeTrackingRow = async (doc, args) => {
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

const fieldMapping = {
  addTrackingRow: writeTrackingRow,
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
