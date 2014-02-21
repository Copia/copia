'use strict';
var mongoose = require('mongoose'),
Transaction = mongoose.model('Transaction');

// Transaction service use transactions controller
var transactions = require('../controllers/transactions');

exports.create = function(request, response) {
  transactions.create(request, response, request.params.userId);
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
        console.log('transaction.from_user_id: ', transaction.from_user_id);
        console.log('request.params.transactionId: ', request.authenticated_user._id);
        response.send(401, 'Not authorized to delete transaction');
      }
    }
  });
}