const { GoogleSpreadsheet } = require('google-spreadsheet');
const { mapAttendanceSheetRowToObject, mapTopicSheetRowToObject } = require('./utils');

const writeTrackingRow = async (doc, args) => {
  console.info(args);
  let { topicId, userId, userName = '', imagePath = '' } = args;
  const directoryRange = (startCol, endCol) => `'KBB Directory'!$${startCol}$2:$${endCol}$200`;

  const sheet = doc.sheetsByIndex[1];
  const result = await sheet.addRow({
    'Topic ID': topicId,
    'User ID': userId ? "'" + ("0000" + userId).slice(-4) : `=ArrayFormula(VLOOKUP(INDIRECT(ADDRESS(ROW(),COLUMN()+5)),{${directoryRange('C', 'C')}&" "&${directoryRange('D', 'D')}, ${directoryRange('A', 'A')}},2, FALSE))`,
    UserName: userName ? userName : `=TEXTJOIN(" ", TRUE, VLOOKUP(INDIRECT(ADDRESS(ROW(),COLUMN()-5)), ${directoryRange('A', 'D')},3, false), VLOOKUP(INDIRECT(ADDRESS(ROW(),COLUMN()-5)), ${directoryRange('A', 'D')},4, false))`,
    Email: `=VLOOKUP(INDIRECT(ADDRESS(ROW(),COLUMN()-1)), ${directoryRange('A', 'D')},2, false)`,
    ImagePath: imagePath,
  });

  return mapAttendanceSheetRowToObject(result);
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
