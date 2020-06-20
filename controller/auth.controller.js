const md5 = require('md5')
const db = require("../db")
let jwt = require('jsonwebtoken');
require('dotenv').config();
const { secretOrKey } = require('./key');

module.exports.login = (req, res) => {
  res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let user = db.get('users').find({ email: email }).value()

  if (!user) {
    res.render("auth/login", {
      errors: [
        'User does not exists'
      ],
      value: req.body
    });
    return;
  }

  let hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      value: req.body
    });
    return;
  } 

  const token = jwt.sign({ userId: user.id }, secretOrKey)
  
  res.status(200).json({
    userId: user.id,
    token: token
})
  // res.cookie('userId', user.id, {
  //   signed: true
  // })
  // res.redirect('/users')
}