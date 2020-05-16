let User = require("../../models/user.model");
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
let _ = require('lodash');

module.exports.index = async (req, res) => {
  let users = await User.find();
  res.json(users)
}

module.exports.create = async (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = async (req, res) => {
  let newUser = await User.create(req.body)
  res.json(newUser)
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