const fs = require('fs');

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/customers-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`The id is: ${val}`);
  // * 1 is to convert from string to number
  if (req.params.id * 1 > customers.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  //only allow customers to be created with name and email
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or email',
    });
  }
  next();
};

exports.getAllCustomers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: customers.length,
    data: {
      customers,
    },
  });
};

exports.getCustomer = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const customer = customers.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
};

exports.createCustomer = (req, res) => {
  const newId = customers[customers.length - 1].id + 1;
  const newCustomer = Object.assign({ id: newId }, req.body);

  customers.push(newCustomer);

  fs.writeFile(
    `${__dirname}/dev-data/data/customers-simple.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          Customer: newCustomer,
        },
      });
    }
  );
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
