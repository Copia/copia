'use strict';

// Loan service use loans controller
var loans = require('../controllers/loans');

exports.create = function(request, response) {
  //check if user already has loan
  loans.create(request, response);
};

exports.get = function(request, response) {
  console.log("GET to: ",request.url, "-->Get Loan" );
  loans.loan(request, response, request.params.loanId);
};

exports.all = function(request, response) {
  loans.all(request, response);
}

exports.update = function(request, response) {
  console.log("PUT to: ",request.params.loanId, "-->Add lender to Loan" );
  //attach lender_id to the loan object
  loans.update(request, response, request.params.loanId);
};

exports.delete = function(request, response) {
  console.log("DELETE to: ",request.url, "-->Delete Loan" );
  loans.destroy(request, response, request.params.loanId);
};