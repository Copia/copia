'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Loan Schema
 */
var LoanSchema = new Schema({
  principal: Number,
  payback_amount: Number,
  match_deadline: String, //last day for loan to be matched
  payback_days: Number, //# of days to payback loan after it's accepted
  category: String,
  purpose: String,
  status: { type: String,
            default: "pending" },
  borrower_id: {type: Schema.Types.ObjectId, ref: 'User'},
  lender_id: {type: Schema.Types.ObjectId, ref: 'User'}
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Statics
 */
LoanSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('borrower_id lender_id').exec(cb);
};

/**
 * Methods
 */
LoanSchema.methods = {
};

mongoose.model('Loan', LoanSchema);

