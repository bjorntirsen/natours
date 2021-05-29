const express = require('express');
const customerController = require('./../controllers/customerController');
const router = express.Router();

//If theres an id param, check if it's valid
router.param('id', customerController.checkID);

router
  .route('/')
  .get(customerController.getAllCustomers)
  .post(customerController.checkBody, customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
