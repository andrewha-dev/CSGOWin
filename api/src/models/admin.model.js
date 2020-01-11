const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  steamId: {
    type: String
  },
});

module.exports = mongoose.model('admin', adminSchema);
