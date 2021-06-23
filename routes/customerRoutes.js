const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('../controllers/authController');

const router = express.Router();

//statistics routes can go here

router
  .route('/')
  .get(authController.protect, customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customerController.deleteCustomer
  );

module.exports = router;
