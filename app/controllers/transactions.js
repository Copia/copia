'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction'),
  _ = require('lodash');

/**
 * Find transaction by id
 */
exports.get = function(req, res, userId, id) {
  console.log('Getting transaction: ', id);
  var query = {}
  query.from_user_id = userId
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
exports.create = function(req, res, userId) {
  console.log('User ', userId, ' creating transaction ', req.body );

  var transaction = new Transaction( 
    _.extend( req.body, {
      from_user_id: userId
    }));

  transaction
  .save(function(err) {
    if (err) {
      console.log(err.err);
      res.send(403, err.err);
    } else {
      console.log("Transaction: ", transaction);
      res.jsonp(transaction);
    }
  });
};

/** 
 * Update a transaction, making sure the from_user_id is not modified, or else Admin auth req!
 */
exports.update = function(req, res, id) {
  console.log('Transaction Update: ', req.body);
  Transaction.findByIdAndUpdate(id, {$set: req.body}, function(err, updatedTransaction) {
    if (err) {
      console.log('Error: ', err.errmsg);
      res.send(403, err.errmsg );
    } else {
      console.log('Updated User: ', updatedTransaction);
      res.jsonp(updatedTransaction);
    }
  });
};


/**
 * List of transactions
 */
exports.all = function(req, res, userId) {
  var query = userId ? { from_user_id: userId } : undefined;
  transaction
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