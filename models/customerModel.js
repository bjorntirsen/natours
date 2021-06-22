const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A customer must have a name.'],
    unique: true,
    maxlength: [
      40,
      'A customer name must have less or equal than 40 characters',
    ],
    minlength: [3, 'A customer name must have more or equal than 3 characters'],
  },
  organisationNr: Number,
  vatNr: String,
  reference: String,
  paymentTerm: Number,
  website: String,
  email: {
    type: String,
    required: [true, 'A customer must have an email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
