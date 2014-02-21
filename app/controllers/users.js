'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Find user by id
 */
exports.get = function(req, res, id) {
  console.log('Getting user:', id);
  User.findById(id, function(err, user) {
    if (err) {
      res.send(404, err.err);
    } else {
      res.jsonp(user);
    }
  });
};

exports.login = function(req, res) {
  console.log("In USERS LOGIN: ", req.body);
  User.find({ username: req.body.username }, function(err, user) {
    //find returns an array...
    var user = user[0];
    user.verifyPassword(req.body.password, function(err, verified) {
      if(err) { res.send(404, err.err); }
      else if (verified) { res.jsonp(user); }
      res.send(404, "LOGIN FAILED. I SEE YOU");
    });
  });        
};
/**
 * Create a user
 */
exports.create = function(req, res) {  
  console.log('Creating user', req.body);
  var user = new User(req.body);
  console.log(user);
  user.save(function(err) {
    if (err) {
      console.log(err.err);
      res.send(403, err.err);
    } else {
      console.log("USER: ", user);
      exports.login(req, res);
    }
  });
};

/**
 * Update a user
 */
exports.update = function(req, res, id) {
  console.log('User Update: ', req.body);
  User.findByIdAndUpdate(id, {$set: req.body}, function(err, updatedUser) {
    if (err) {
      console.log('Error: ', err.errmsg);
      res.send(403, err.errmsg );
    } else {
      console.log('Updated User: ', updatedUser);
      res.jsonp(updatedUser);
    }
  });
};

/**
 * Delete an user
 */
exports.destroy = function(req, res, id) {
  var user = User.findByIdAndRemove(id, function(err, query) {
    res.jsonp(query);
  });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
  User.find().sort('-created').exec(function(err, users) {
    if (err) {
      res.send(500, 'Internal server error');
    } else {
      res.jsonp(users);
    }
  });
};