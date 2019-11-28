const fs = require('fs');
const { google } = require('googleapis');
const privatekey = require('./cox-sharing-tracker-credentials.json');

const tokenFile = 'service-token.json';

let token;
if (fs.existsSync(tokenFile)) {
  token = require(`./${tokenFile}`);
  console.log('Cached token', token);
  if (token.expiry_date < Date.now()) {
    token = null;
  }
}

const getJwtClient = async token => {
  // configure a JWT auth client
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  //authenticate request
  let tokens;
  if (token) {
    tokens = (await jwtClient.refreshToken(token.refreshToken)).tokens;
  } else {
    tokens = await jwtClient.authorize();
    console.log('Successfully connected!');
    console.log(tokens);
    fs.writeFileSync(tokenFile, JSON.stringify(tokens));
  }
  return jwtClient;
};

(async () => {
  //Google Sheets API
  const jwtClient = await getJwtClient(token);
  let spreadsheetId = process.argv[2];
  let sheetName = 'Topics!A1:H100';
  let sheets = google.sheets('v4');
  sheets.spreadsheets.values.get(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: sheetName,
    },
    function(err, response) {
      if (err) {
        console.log('The API returned an errorr', err);
      } else {
        //   console.log(response);
        response.data.values.forEach(row => {
          console.log(row.join(', '));
        });
      }
    }
  );
})();
