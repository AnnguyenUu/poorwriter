const md5 = require('md5')
let User = require("../models/user.model");
let jwt = require('jsonwebtoken');
require('dotenv').config();
const { secretOrKey } = require('./key');

module.exports.login = (req, res) => {
  res.render('auth/login')
}

module.exports.postLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  let user = await User.findOne({ email: email })

  if (!user) {
    res.render("auth/login", {
      errors: [
        'User does not exists'
      ],
      value: req.body
    });
    return;
  }

  let hashedPassword = (password);

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
  
  res.cookie('authorization', 'JWT ' +  token, { httpOnly: true })
  res.redirect('/users')
}