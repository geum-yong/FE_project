const mongoose = require('mongoose');
const getCurrentDate = require('../lib/getCurrentDate');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    default: getCurrentDate(),
  },
  userLikes: {
    type: [Number],
    default: [],
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
