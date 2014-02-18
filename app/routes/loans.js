'use strict';

// Loan routes use loan service
var loan_service = require('../services/loan_service');

module.exports = function(app) {

  app.post('/users/:userId/loans', loan_service.create);

  app.get('/users/:userId/loans/:loanId', loan_service.get);

  app.put('/users/:userId/loans/:loanId', loan_service.update);
  
  app.delete('/users/:userId/loans/:loanId', loan_service.delete);

};
