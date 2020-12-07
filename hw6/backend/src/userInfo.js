const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Salt is required']
  },
  dob: {
    type: Date,
    required: [true, 'dob is required']
  },
  zipcode: {
    type: String,
    required: [true, 'Zip is required']
  },
  followers: {
    type: Array,
    required: [true, 'Followers is required']
  },
  headline: {
    type: String,
    required: [true, 'Headline is required']
  },
  avatar: {
    type: String,
  }
})

module.exports = userInfo;
