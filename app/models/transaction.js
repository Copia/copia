'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Transaction Schema
 */
var TransactionSchema = new Schema({
    from_user_id: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    to_user_id: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    loan_id: {
      type: Schema.Types.ObjectId, 
      ref: 'Loan',
      required: true
    },
    transaction_date: String,
    venmo_amount: Number,
    venmo_audience: String,
    venmo_date_created: String,
    venmo_date_completed: String,
    venmo_payment_id: String,
    venmo_status: String,
    venmo_fee: Number,
    venmo_refund: Number
});



/**
 * Statics
 */
TransactionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('from_user_id to_user_id load_id').exec(cb);
};

/**
 * Methods
 */
TransactionSchema.methods = {
};

var Transaction = mongoose.model('Transaction', TransactionSchema);

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};
Transaction.schema.path('from_user_id').validate(function (value) {
  return ;
}, 'Invalid payer id');

