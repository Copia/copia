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
var AccountSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    access_token: String,
    refresh_token: String,
    expires_in: String,
    token_timestamp: String,
    
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
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Statics
 */
AccountSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('from_user_id to_user_id load_id').exec(cb);
};

/**
 * Methods
 */
AccountSchema.methods = {
};

mongoose.model('Transaction', TransactionSchema);

