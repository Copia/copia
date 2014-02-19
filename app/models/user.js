'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password_hash: String,
    password_salt: String,
    session_token: String,
    karma: Number,
});

/**
 * Virtuals
 */
// UserSchema.virtual('password').set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
// }).get(function() {
//     return this._password;
// });

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Methods
 */
UserSchema.methods = {
};

mongoose.model('User', UserSchema);

