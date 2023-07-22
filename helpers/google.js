const {web: credentials} = require('../client_secret_google.json');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(credentials.client_id);

const verifyGoogle = async (_idToken) =>{
  const ticket = await client.verifyIdToken({
      idToken: _idToken,
      audience: credentials.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const {
    name,
    picture: img,
    email
  } = ticket.getPayload();
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  // console.log(userid);
  // console.log(domain);
  return {
    name,
    img,
    email
  };
}


module.exports = verifyGoogle;