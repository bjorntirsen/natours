const fs = require('fs');
const express = require('express');

const router = express.Router();

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/customers-simple.json`)
);

const getAllCustomers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: customers.length,
    data: {
      customers,
    },
  });
};

const getCustomer = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const customer = customers.find((el) => el.id === id);

  //if(id > Customers.length) {
  if (!customer) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      customer,
    },
  });
};

const createCustomer = (req, res) => {
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

const updateCustomer = (req, res) => {
  if (req.params.id * 1 > customers.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      Customer: '<Updated Customer here>',
    },
  });
};

const deleteCustomer = (req, res) => {
  if (req.params.id * 1 > customers.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

router.route('/').get(getAllCustomers).post(createCustomer);

router
  .route('/:id')
  .get(getCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
