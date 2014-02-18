'use strict';

// Transaction routes use transactions service
var transaction_service = require('../services/transaction_service');

module.exports = function(app) {

  app.post('/users/:userId/transactions', transaction_service.create);
  
  app.get('/users/:userId/transactions/:transactionId', transaction_service.get);

};
