const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    expires: '7d',
    default: Date.now,
  }
});

module.exports = mongoose.model('RefreshTokens', RefreshTokenSchema);