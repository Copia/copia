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
    access_token: String,
    balance: String,
    expires_in: Number,
    user: {
        username: String,
        first_name: String,
        last_name: String,
        display_name: String,
        is_friend: Boolean,
        friends_count: Number,
        about: String,
        email: {type: String, unique: true},
        phone: String,
        profile_picture_url: String,
        id: String,
        date_joined: String,
    },
    refresh_token: String
    // display_name: String,
    // first_name: String,
    // email: {
    //     type: String,
    //     unique: true
    // },
    // password_hash: String,
    // password_salt: String,
    // session_token: String,
    // karma: Number
}, {
    collection: "people"
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

