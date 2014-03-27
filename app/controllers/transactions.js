'use strict';
var debug = require('debug');

/**
 * Module dependencies.
 */
var  mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction'),
        User = mongoose.model('User'),
            _ = require('lodash'),
     venmoAPI = require('../lib/venmoAPI.js');
/**
 * Find transaction by id
 */
exports.get = function(req, res, userId, id) {
  debug('Getting transaction: ', id);
  var query = {};
  query.from_user_id = userId;
  if(id) query._id = id;
  
  Transaction
  .find(query, function(err, transaction) {
    if (err) {
      res.send(404, err.err);
    } else {
      res.jsonp(transaction);
    }
  });
};

exports.destroy = function(req, res, id) {
  Transaction
  .findByIdAndRemove(id, function(err, query) {
    res.jsonp(query);
  });
};

/**
 * Create a transaction
 */
exports.create = function(req, res, loan, lender) {
  debug('User ', req.authenticated_user, ' creating transaction ', req.body );

  if (!lender || !lender.user) {
    debug('transaction.js/create => Error, lender venmo account not available (loan funded?). Lender:', lender);
    return res.send(400, 'transaction.js/create => Error, lender venmo account not available (loan funded?). Lender:' + lender);

  }
  var venmoPayment = {
    "access_token" : req.authenticated_user_access_token,
    "email" : lender.user.email,
    "note" : loan.purpose,
    "amount" : loan.payback_amount,
    "audience" : "public"
  };

  debug('transaction.js/create/venmoApi.postPayment => create', venmoPayment);
  venmoAPI.postPayment(venmoPayment, function(err, response, data) {
    var body = JSON.parse(data);
    if (err || body.err) {
      return response.send(400, 'Venmo payment did not go through');
    }

    var transaction = new Transaction({
      from_user_id: req.authenticated_user,
      to_user_id: loan.lender_id,
      loan_id: loan._id,
      transaction_date: Date.now(),
      venmo_amount: loan.payback_amount,
      venmo_audient: "public",
      venmo_date_created: Date.now(),
      venmo_date_completed: Date.now(),
      venmo_status: "pending",
      venmo_payment_id: null,
      venmo_fee: 0,
      venmo_refund: null
    });

    debug('transaction.js/create/venmoApi.postPayment => transaction: ', transaction);
    debug('transaction.js/create/venmoApi.postPayment => Venmo data: ', data);
    req.authenticated_user.karma += loan.payback_amount;
    req.authenticated_user.save();
    debug("UPDATED USER: ", req.authenticated_user);
    transaction
    .save(function(err) {
      if (err) {
        debug(err.err);
        res.send(403, err.err);
      } else {
        debug("Transaction: ", transaction);
        loan.status = "repaid";
        loan.save();
        res.jsonp(transaction);
      }
    });
  });

};

/** 
 * Update a transaction, making sure the from_user_id is not modified, or else Admin auth req!
 */
exports.update = function(req, res, id) {
  debug('Transaction Update: ', req.body);
  Transaction.findByIdAndUpdate(id, {$set: req.body}, function(err, updatedTransaction) {
    if (err) {
      debug('Error: ', err.errmsg);
      res.send(403, err.errmsg );
    } else {
      debug('Updated User: ', updatedTransaction);
      res.jsonp(updatedTransaction);
    }
  });
};


/**
 * List of transactions
 */
exports.all = function(req, res, userId) {
  var query = userId ? { from_user_id: userId } : undefined;
  Transaction
  .find(query)
  .sort('-created')
  .populate('from_user_id to_user_id loan_id')
  .exec(function(err, transactions) {
    if (err) {
      res.render('error', {
        status: 500
      });
    } else {
      res.jsonp(transactions);
    }
  });
};
