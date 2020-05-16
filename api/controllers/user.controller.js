
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
  let users = await User.find();
  // res.json(users)
  res.render('users/index', {
    users: users
  })
}

module.exports.create = async (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = async (req, res) => {
  req.body.avatar = req.file.path.replace(/\\/g, "/").split("/").slice(3).join("/")
  let newUser = await User.create(req.body)
  // res.json(newUser)
  res.redirect('/users')
}

module.exports.get = async (req, res) => {
  let id = req.params.id
  let o_id = new ObjectId(id)
  let foundUser = await User.findOne({ _id: o_id })
  res.json(foundUser)
}

module.exports.delete = async (req, res) => {

  let delete_id = new ObjectId(req.params.id)

  let foundUser = await User.findOne( { _id: delete_id})

  if(!foundUser) res.status(500).send("Không tìm thấy user")

  let removeUser = await User.deleteOne( { _id: delete_id } )
  
  res.json(removeUser)
}

module.exports.update = async (req, res) => {
  let mongo_id = new ObjectId(req.params.id)
 
  let foundUser = await User.findOne({ _id: mongo_id })

  if (!foundUser) {
    res.status(500).send("Không tìm thấy user")
  }

  let updatedUser = await User.findOneAndUpdate({ _id: mongo_id }, {
    $set:  req.body
  }, {
    $exists: true, $ne: null
  })
  res.json(updatedUser)
}