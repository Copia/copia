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
    principle: Number,
    term_amount: Number,
    term_data: String,
    term_status: String,
    term_purpose: String,
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

