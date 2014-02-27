'use strict';

// Loan service use loans controller
var mongoose = require('mongoose'),
    loans = require('../controllers/loans'),
    users = require('../controllers/users'),
    venmo = require('../lib/venmoAPI'),
    Loan = mongoose.model('Loan'),
    User = mongoose.model('User');

exports.create = function(request, response) {
  //check if user already has loan
  User.findById(request.params.userId, function( err, user ) {
    if( err ) {
      response.send(404, "Error retrieving user");
    } else {
      if( !user.user.email ) {
        response.send(404, "Must link with venmo");
      }
    }
  });
  Loan.find({ borrower_id: request.params.userId, status: "pending" }, function(err, loan) {
    console.log("LOAN CREATE: ", err, loan);
    if( loan.length > 0 ) {
      response.send(401, "Unauthorized: loan already out");
    } else {
    loans.create(request, response);
    }
  });
};

exports.get = function(request, response) {
  console.log("GET to: ",request.url, "-->Get Loan" );
  loans.loan(request, response, request.params.loanId);
};

exports.all = function(request, response) {
  loans.all(request, response);
}

exports.update = function(request, response) {
  Loan.load(request.params.loanId, function(err, loan) {
    if( err ) {
      response.send(401, "Loan not found");
    } else if ( loan.status !== "pending" ) {
      response.send(401, "Loan not available");
    } else {
      User.findById(request.body.lender_id, "access_token", function(err, user) {
        if( err ) { response.send(404, "Error retrieving user"); }
        var data = {
        "access_token" : user.access_token,
        "email" : loan.borrower_id.user.email,
        "note" : loan.purpose,
        "amount" : loan.principal,
        "audience" : "public"
        };
        venmo.postPayment(data, function(err, response) {
          if( err || body.error ) {
            response.send(401, "Venmo transaction failed");
          } else {
            console.log("VENMO RESP:   ", response);
            loans.update(request, response, loan, response);
          }
        });
      }); 
    }
  });
};

exports.delete = function(request, response) {
  console.log("DELETE to: ",request.url, "-->Delete Loan" );
  loans.destroy(request, response, request.params.loanId);
};