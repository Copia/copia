'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Loan = mongoose.model('Loan'),
    _ = require('lodash');

/**
 * Find loan by id
 */
exports.loan = function(req, res, id) {
    Loan.load(id, function(err, loan) {
        if (err) return next(err); 
        if (!loan) return next(new Error('Failed to load loan ' + id));
        res.jsonp(loan);
    });
};

/**
 * Create a loan
 */
exports.create = function(req, res) {
    var loan = new Loan(req.body);
    loan.save(function(err) {
        if (err) {
            return res.send('./public/404.html', {
                errors: err.errors,
                loan: loan
            });
        } else {
            console.log("loan created");
            res.jsonp(loan);
        }
    });
};

/**
 * Update a loan
 */
exports.update = function(req, res, id) {
  var lender = req.body.lender_id;
  Loan.findByIdAndUpdate(id,{ matched: true, lender_id: lender },function(err, query){
    res.jsonp(query);
  });
};

/**
 * Delete an loan
 */
exports.destroy = function(req, res, id) { 
  Loan.findByIdAndRemove(id, function(err, query){
    res.jsonp(query);
  });
};

/**
 * Show an loan
 */
exports.show = function(req, res) {
    res.jsonp(req.loan);
};

/**
 * List of loans
 */
exports.all = function(req, res) {
    Loan.find().sort('-created').populate('borrower_id lender_id').exec(function(err, loans) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log(loans);
            res.jsonp(loans);
        }
    });
};