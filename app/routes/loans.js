'use strict';

// Loan routes use loan service
var loan_service = require('../services/loan_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

  app.post('/users/:userId/loans', authentication.router_auth, loan_service.create);

  app.get('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.get);

  app.put('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.update);
  
  app.delete('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.delete);

};