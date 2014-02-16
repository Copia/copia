'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Transaction = mongoose.model('transaction'),
    _ = require('lodash');

/**
 * Find transaction by id
 */
exports.transaction = function(req, res, id) {
    Transaction.load(id, function(err, transaction) {
        if (err) return next(err); 
        if (!transaction) return next(new Error('Failed to load transaction ' + id));
        res.jsonp(transaction);
    });
};

/**
 * Create a transaction
 */
exports.create = function(req, res) {
    var transaction = new Transaction(req.body);
    transaction.save(function(err) {
        if (err) {
            return res.send('./public/404.html', {
                errors: err.errors,
                transaction: transaction
            });
        } else {
            res.jsonp(transaction);
        }
    });
};

/**
 * List of transactions
 */
exports.all = function(req, res) {
    transaction.find().sort('-created').populate('from_user_id to_user_id load_id').exec(function(err, transactions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(transactions);
        }
    });
};