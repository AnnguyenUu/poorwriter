let jwt = require('jsonwebtoken');
require('dotenv').config();
const { secretOrKey } = require('../controller/key');
let Buffer = require('buffer/').Buffer

module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  const tokenAuth = token.substring("JWT ".length)
  if (!tokenAuth) {
    res.sendStatus(403).send('Unauthorized');
  }
  // jwt.verify(tokenAuth, new Buffer( secretOrKey, 'base64' ), { algorithms: ['HS256'] }, (err, payload) => {
  //   return payload
  // })
  try {
    const decoded = jwt.verify(tokenAuth, secretOrKey);
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json('Token not valid')
  }
}