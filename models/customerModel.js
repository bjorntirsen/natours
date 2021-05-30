const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A customer must have a name.'],
    unique: true,
  },
  organisationNr: Number,
  vatNr: String,
  reference: String,
  paymentTerm: Number,
  website: String,
  email: {
    type: String,
    required: [true, 'A customer must have an email.'],
  },
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
