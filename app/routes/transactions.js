'use strict';

// Transaction routes use transactions service
var transaction_service = require('../services/transaction_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

  app.get('/users/:userId/transactions/:transactionId', authentication.router_auth, transaction_service.get);

  app.post('/users/:userId/transactions', authentication.router_auth, transaction_service.create);

};