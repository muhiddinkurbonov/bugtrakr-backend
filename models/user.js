const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;