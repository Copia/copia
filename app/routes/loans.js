'use strict';

// Loan routes use loan service
var loan_service = require('../services/loan_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

  app.get('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.get);

  app.put('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.update);
  
  app.delete('/users/:userId/loans/:loanId', authentication.router_auth, loan_service.delete);

  app.post('/users/:userId/loans', authentication.router_auth, loan_service.all);

};