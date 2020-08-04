let jwt = require('jsonwebtoken');
require('dotenv').config();
const { secretOrKey } = require('../controller/key');

module.exports.requireAuth = (req, res, next) => {
  
  const token = req.cookies['authorization'] || req.headers.authorization;

  if(!token) {
    res.redirect('/auth/login');
    return;
  }

  const tokenAuth = token.substring("JWT ".length)
  if (!tokenAuth) {
    res.sendStatus(403).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(tokenAuth, secretOrKey, { algorithms: ['HS256'] },);
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json('Token not valid')
  }
}