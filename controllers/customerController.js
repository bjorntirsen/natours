const Customer = require('./../models/customerModel');

exports.getAllCustomers = (req, res) => {
  res.status(200).json({
    status: 'success',
    /* results: customers.length,
    data: {
      customers,
    }, */
  });
};

exports.getCustomer = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  /* const customer = customers.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  }); */
};

exports.createCustomer = async (req, res) => {
  //Returns promise. Can also use .then here,
  //but i'm using async await.
  //With async await I need to use try catch
  //to check for errors.
  try {
    newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCustomer = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      Customer: '<Updated Customer here>',
    },
  });
};

exports.deleteCustomer = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
