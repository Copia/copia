'use strict';

// Transaction routes use transactions service
var transaction_service = require('../services/transaction_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {


  app.get('/users/:userId/transactions/:transactionId', authentication.router_auth, transaction_service.get);
  app.get('/users/:userId/transactions', authentication.router_auth, transaction_service.get);

  app.post('/users/:userId/transactions', authentication.router_auth, transaction_service.create);

  app.put('/users/:userId/transactions/:transactionId', authentication.router_auth, transaction_service.update);

  app.delete('/users/:userId/transactions/:transactionId', authentication.router_auth, transaction_service.delete);
  

  // TEST ROUTES TO VERIFY CRUD 
  app.post('/_users/:userId/_transactions', transaction_service.create);
  app.get('/_users/:userId/_transactions/:transactionId', transaction_service.get);
  app.delete('/_users/:userId/_transactions/:transactionId', transaction_service.delete);
  app.put('/_users/:userId/_transactions/:transactionId', transaction_service.update);
  app.get('/_users/:userId/_transactions', transaction_service.listAll);

};