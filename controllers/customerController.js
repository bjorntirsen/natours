const { query } = require('express');
const Customer = require('./../models/customerModel');

//Customer.find Returns promise. Can also use .then here,
//but i'm using async await.
//With async await I need to use try catch
//to check for errors.
exports.getAllCustomers = async (req, res) => {
  try {
    // 1. Build Query
    //Create hard copy of obj by destructuring
    const queryObj = { ...req.query };
    //Delete fields that will be handled elsewhere
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    //Add operator to query strings
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Customer.find(JSON.parse(queryStr));

    // 2. Execute Query
    const customers = await query;

    res.status(200).json({
      status: 'success',
      results: customers.length,
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      //Return the updated customer
      new: true,
      //Run validation on the updates
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
