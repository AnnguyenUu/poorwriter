require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  age: Number,
  gender: String
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;