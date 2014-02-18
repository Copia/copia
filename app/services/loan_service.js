'use strict';

// Loan service use loans controller
var loans = require('../controllers/loans');

exports.create = function(request, response) {
  console.log("POST to: ",request.body.url, "-->Create Loan" );
  //check if user already has loan
  loans.create(request, response);
};

exports.get = function(request, response) {
  console.log("GET to: ",request.body.url, "-->Get Loan" );
  loans.loan(request, response, request.body.loanId);
};

exports.update = function(request, response) {
  console.log("PUT to: ",request.body.url, "-->Add lender to Loan" );
  //attach lender_id to the loan object
  loans.update(request, response);
};

exports.delete = function(request, response) {
  console.log("DELETE to: ",request.body.url, "-->Delete Loan" );
  loans.destroy(request, response);
};