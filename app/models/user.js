'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   bcrypt = require('bcrypt'),
   SALT_FACTOR = 10;

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
        email: {
          type: String, 
          sparse: true,
          unique: true
        },
        phone: String,
        profile_picture_url: String,
        id: String,
        date_joined: String,
    },
    username: {
      type: String,
      unique: true
    },
    organization: String,
    password: String, 
    password_salt:String,
    session_token: String,
    karma: Number,
    refresh_token: String
  }, 
  {
    collection: "people"
  }
);


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

UserSchema.pre("save" , function(next) {
  var user = this;

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if(err) return next(err);

    user.password_salt = salt;
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

var generateSessionToken = function(cb) {
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    cb(err, salt);
  });
};

/**
* Methods
*/

UserSchema.methods.verifyPassword = function(password, cb) {
    var user = this;
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        generateSessionToken(function(err, salt) {
          if(err) console.log(err);
          user.session_token = salt;
          user.save();
          cb(null, isMatch);
        });
    });
};

mongoose.model('User', UserSchema);
