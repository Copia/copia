'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Loan = mongoose.model('Loan'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Find loan by id
 */
exports.loan = function(req, res, id) {
    Loan.load(id, function(err, loan) {
        if ( err || !loan ) {
          res.send(404, "Loan not found");
        } else {
          res.jsonp(loan);
        }
    });
};

/**
 * Create a loan
 */
exports.create = function(req, res) {
    var loan = new Loan(req.body.loan);
    loan.borrower_id = req.params.userId;
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
exports.update = function(req, res, loan, venmoResponse) {
  //console.log("IN LOAN CNTRLR: ", loan, venmoResponse.body);
  var addedKarma = loan.principal;

  loan.status = "funded";
  loan.lender_id = req.body.lender_id;
  User.findById(req.body.lender_id, function(err, user) {
    if( err ) {
      res.send(500, "Couldn't update karma");
    } else {
      user.karma += addedKarma;
      user.save();
    }
  });
  loan.save();
  console.log(loan);
  res.send("Good Job");   
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
            res.jsonp(loans);
        }
    });
};