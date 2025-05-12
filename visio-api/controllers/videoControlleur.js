const twilio = require('twilio');
require('dotenv').config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

exports.getToken = (req, res) => {
  const { identity, room } = req.body;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = identity;

  const videoGrant = new VideoGrant({ room });
  token.addGrant(videoGrant);

  res.send({ token: token.toJwt() });
};
