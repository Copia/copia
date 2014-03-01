'use strict';

// Loan service use loans controller
var mongoose = require('mongoose'),
loans = require('../controllers/loans'),
users = require('../controllers/users'),
venmo = require('../lib/venmoAPI'),
Loan = mongoose.model('Loan'),
User = mongoose.model('User');

var applyIfOwned = function(request, response, cb) {
  if (!request.params || ! request.params.loanId) {
    return response.send(400, 'Bad response. No loanId provided.');
  }
  Loan.findById( request.params.loanId, function(err, loan) {
    if (err) { 
      response.send(404, 'Loan not found' + request.params.loanId);
    } else {
      // TODO : Figure out proper cast to remove this '=='
      if (''+loan.borrower_id === ''+request.authenticated_user._id) {
        cb(request, response, loan);
      } else {
        console.log('loan_service.js/applyIfOwned => loan.borrower_id: ', loan.borrower_id);
        response.send(401, 'loan_service.js/applyIfOwned => Not authorized to modify loan with id ' +  loan._id);
      }
    }
  });
};

exports.create = function(request, response) {
  //check if user already has loan
  User.findById(request.params.userId, function( err, user ) {
    if( err ) {
      response.send(404, "Error retrieving user");
    } else if( !user.user.email ) {
        response.send(404, "Must link with venmo");
    } else {
        Loan.find({ borrower_id: request.params.userId, status: "pending" }, function(err, loan) {
          console.log("LOAN CREATE: ", err, loan);
          if( loan.length > 0 ) {
            response.send(401, "Unauthorized: loan already out");
          } else {
            loans.create(request, response);
          }
        });
      }
  });
};

exports.get = function(request, response) {
  console.log("GET to: ",request.url, "-->Get Loan" );
  loans.loan(request, response, request.params.loanId);
};

exports.all = function(request, response) {
  loans.all(request, response);
};

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
        venmo.postPayment(data, function(err, resp, data) {
          var body = JSON.parse(data);
          if( err || body.error ) {
            console.log("error in transaction in loan_service.update: ",body.error);
            response.send(401, "Venmo transaction failed");
          } else {
            loans.update(request, response, loan, resp);
          }
        });
      }); 
    }
  });
};

exports.delete = function(request, response) {
  console.log(" loan_service.js/delete => Cancelling loan: ",  request.params.loanId);
  applyIfOwned(request, response, function(request, response, loan) {
    if (loan.status === 'pending') {
      loan.status = 'cancelled';
      loan.save( function(err, data) {
        if (err) {
          return response.send(400, 'Could not cancel loan.');
        } else {
          response.send(200, 'Loan cancelled');
        }
      });
    }
  });
};




