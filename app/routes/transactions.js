'use strict';

// Transaction routes use transactions controller
var transactions = require('../controllers/transactions');

module.exports = function(app) {

  app.post('/users/:userId/transactions', function(request, response) {
    console.log("POST to: ",request.body.url, "-->Create Transaction" );
    transactions.create(request,response);
  });

  app.get('/users/:userId/transactions/:transactionId', function(request, response) {
    console.log("GET to: ",request.body.url, "-->Get transaction" );
    transactions.transaction(request,response, request.params.transactionId);
  });

};
