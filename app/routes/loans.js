'use strict';

// Loan routes use loans controller
var loans = require('../controllers/loans');

module.exports = function(app) {

  app.post('/users/:userId/loans', function(request, response) {
    console.log("POST to: ",request.body.url, "-->Create Loan" );
    loans.create(request,response);
  });

  app.get('/users/:userId/loans/:loanId', function(request, response) {
    console.log("GET to: ",request.body.url, "-->Get Loan" );
    loans.loan(request,response, request.params.loanId);
  });

  app.put('/users/:userId/loans/:loanId', function(request, response) {
    console.log("PUT to: ",request.body.url, "-->Modify Loan" );
  });

  app.delete('/users/:userId/loans/:loanId', function(request, response) {
    console.log("DELETE to: ",request.body.url, "-->Delete Loan" );
  });
};
