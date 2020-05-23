
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
let User = require("../../models/user.model");
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;

// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

module.exports.index = async (req, res) => {
  let { page = 1, limit = 5 } = req.query
  let users = await User.find()
  .limit(limit * 1)
  .skip((page - 1)* limit)
  .exec();
  const count = await User.countDocuments();
  res.render('users/index', {
    users: users,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  })
}

module.exports.search = async (req, res, next) => {
  var q = req.query.q
  let users = await User.find()
  let result = await users.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  })
  res.render('users/index', {
    users: result
  })
}

module.exports.create = async (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = async (req, res) => {
  req.file !== undefined ?
  req.body.avatar = req.file.path.replace(/\\/g, "/").substring("public".length) : req.body.avatar = "/uploads/defaultAvatar.png" 
  let newUser = await User.create(req.body)
  // res.json(newUser)
  res.redirect('/users')
}

module.exports.get = async (req, res) => {
  let id = req.params.id
  let query = req.query.q
  let o_id = new ObjectId(id)
  let foundUser = await User.findOne({ _id: o_id })
  res.render('users/view', {
    user: foundUser
  })
}

module.exports.delete = async (req, res) => {

  let delete_id = new ObjectId(req.params.id)

  let foundUser = await User.findOne({ _id: delete_id })

  if (!foundUser) res.status(500).send("Không tìm thấy user")

  let removeUser = await User.deleteOne({ _id: delete_id })

  res.redirect('/users')
}

module.exports.update = async (req, res) => {
  
  req.file !== undefined ?
  req.body.avatar = req.file.path.replace(/\\/g, "/").substring("public".length) : req.body.avatar

  let mongo_id = new ObjectId(req.params.id)

  let foundUser = await User.findOne({ _id: mongo_id })

  if (!foundUser) {
    res.status(500).send("Không tìm thấy user")
  }

  let updatedUser = await User.findOneAndUpdate({ _id: mongo_id }, {
    $set: req.body
  }, {
    $exists: true, $ne: null
  })
  res.redirect('/users')
}
