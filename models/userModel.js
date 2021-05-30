const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
  },
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
