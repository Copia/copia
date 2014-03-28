'use strict';
var debug = require('debug');

var mongoose = require('mongoose'),
Transaction = mongoose.model('Transaction'),
Loan = mongoose.model('Loan'),
User = mongoose.model('User');

// Transaction service use transactions controller
var transactions = require('../controllers/transactions');

// TODO: double lookup of same transaction in database ... need to rethink this
// architecture, but works for now.
var applyIfOwned = function(request, response, cb) {
  Transaction.findById( request.params.transactionId, function(err, transaction) {
    if (err) { 
      response.send(404, 'Transaction not found');
    } else {
      // TODO : Figure out proper cast to remove this '=='
      if (''+transaction.from_user_id === ''+request.authenticated_user._id) {
        cb(request, response, request.params.transactionId);
      } else {
        debug('transaction.from_user_id: ', transaction.from_user_id);
        debug('request.params.transactionId: ', request.authenticated_user._id);
        response.send(401, 'Not authorized to delete transaction');
      }
    }
  });
};

exports.create = function(request, response) {
  Loan.find({_id: request.body.loan_id }, function(err, loan) {
    if (err) {
      return response.send(400, 'transaction_service.js/create/Loan.find => Could not find loan with id ' + request.body.loan_id);
    } 
    if (loan.borrower_id !== request.body.authenticated_user ) {
      var msg = 'User ' + request.authenticated_user + ' is not in borrower_id field of loan ' + request.body.loan_id;
      return response.send(401, 'transaction_service.js/create/Loan.find => ' + msg);
    } 
    debug("transaction_service/create/Loan.find => create transaction against loan ", loan[0], 'loan_id in POST: ', request.body.loan_id);
    User.find( {_id:loan[0].lender_id}, function(err, lender) {
      if (err) {
        return response.send(401, 'transaction_service.js/create/Loan.find => could not find the lender with lender Id' + loan[0].lender_id);
      }
      debug("transaction_service/create/Loan.find => paying lender: ", lender[0]);
      transactions.create(request, response, loan[0], lender[0]);  
    });
  });
};

exports.get = function(request, response) {
  transactions.get(request,response, request.params.userId, request.params.transactionId);
};

exports.listAll = function(request, response) {
  //transactions.get(request,response, request.params.userId);
};

exports.update = function(request, response) {
  applyIfOwned(request, response, transactions.update);
};

exports.delete = function(request, response) {
  applyIfOwned(request, response, transactions.destroy);
};
