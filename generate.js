const {JWT} = require('google-auth-library');
const keys = require('./electripure-498d1-firebase-adminsdk-lnlg0-16973e5d5a.json');

async function main() {
  const client = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  console.log((await client.getAccessToken()).token);
}

main().catch(console.error);