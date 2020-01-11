const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  steamId: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  balance: {
    type: Number
  },
  isAdmin: {
    type: Boolean
  }
});

module.exports = mongoose.model('user', userSchema);
