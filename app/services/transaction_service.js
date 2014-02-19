'use strict';

// Transaction service use transactions controller
var transactions = require('../controllers/transactions');

exports.create = function(request, response, next) {
  console.log("POST to: ",request.body.url, "-->Create Transaction" );
  transactions.create(request, response);
};

exports.get = function(request, response, next) {
  console.log("GET to: ",request.body.url, "-->Get transaction" );
  transactions.transaction(request,response, request.params.transactionId);
};