'use strict';
var debug = require('debug')('./users');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        User = mongoose.model('User'),
           _ = require('lodash'),
      config = require('../../package.json').config;

/**
 * Find user by id
 */
exports.get = function(req, res, id) {
  debug('controllers/user.js:get/User.findById => Getting user:', id);
  User.findById(id, function(err, user) {
    if (err) {
      debug('controllers/user.js:User.findById => got error ' + err);
      res.send(400,'controllers/user.js:User.findById => got error ' + err);
    } else {
      res.jsonp(user);
    }
  });
};

exports.login = function(req, res) {
  debug('controllers/users.js:login => Finding user: ',req.body);
  if (!req.body || !req.body.username) {
    debug('controllers/user.js:login => No username provided');
    res.send(401, 'controllers/user.js:login => No username provided');
  } else {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        debug('controllers/user.js:login/User.find => Could not find user with username' + req.body.username + 'Err: ' + err);
        res.send(401, 'controllers/user.js:login/User.find => Could not find user with username' + req.body.username + 'Err: ' + err);
      } else {
        //var user = user[0];
        if (!user) {
          debug('controllers/user.js:login/User.find => Could not find user with username ' + req.body.username);
          res.send(401, 'controllers/user.js:login/User.find => Could not find user with username ' + req.body.username);
        } else {
          user.verifyPassword(req.body.password, function(err, verified) {
            if(err) { 
              debug('controllers/user.js:login/verifyPassword => user.verifyPassword. Err:' + err); 
              res.send(401, 'controllers/user.js:login/verifyPassword => user.verifyPassword. Err:' + err); 
            }
            else if (verified) { 
              res.jsonp(user); 
            }
            else {
              debug("controllers/user.js:login/verifyPassword => Invalid Username/Password supplied");
              res.send(401, "controllers/user.js:login/verifyPassword => Invalid Username/Password supplied");
            }
          });
        }
      }
    });   
  }     
};
/**
 * Create a user
 */
exports.create = function(req, res) {  
  debug('controllers/user.js:create/user.save => Creating user', req.body);
  var tempPassword = req.body.password;
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      debug('controllers/user.js:create/user.save => got error', err);
      res.send(403, "controllers/user.js:create/user.save => got error. " + err);
    } else {
      user.verifyPassword(tempPassword, function(err, verified) {
        if(err) { 
          debug("controllers/user.js:create/user.verifyPassword got error." + err); 
          res.send(401, "controllers/user.js:create/user.verifyPassword got error." + err); 
        }
        else if (verified) { 
          res.jsonp(user); 
        }
        else {
          res.send(401, "controllers/user.js:create/user.verifyPassword => NEW USER LOGIN FAILED.");
        }
      });
    }
  });
};

exports.addUserToVenmo = function(req, res) {  
  debug('controllers/user.js:addUserToVenmo =>Connecting with Venmo', req.body);
  debug( 'controllers/user.js:addUserToVenmo =>User ID to add to Venmo: ', req.userId);
  debug( 'controllers/user.js:addUserToVenmo =>Adding user to Venmo:', req.body.user);
  debug( 'controllers/user.js:addUserToVenmo =>ACCESS_TOKEN:', req.body.access_token);
  
  User.findByIdAndUpdate(req.userId, {access_token: req.body.access_token, user: req.body.user}, function(err, updatedUser) {
    if (err) {
      res.send(401, "controllers/user.js:addUserToVenmo/User.findByIdAndUpdate => got error" + err.errmsg );
    } else {
      debug('controllers/user.js:addUserToVenmo/User.findByIdAndUpdate =>Received user Venmo Accout/session_token: ', updatedUser);
      var conf = config.host ? (config.host+'/') : '';
      debug('controllers/user.js:addUserToVenmo/User.findByIdAndUpdate => Redirecting user to Dashboard: ', 'https://'+conf+'#/dashboard');
      res.redirect(302, 'https://' + conf + '#/dashboard');
    }
  });
};

/**
 * Update a user
 */
exports.update = function(req, res, id) {
  debug('controllers/user.js:update/User.findByIdAndUpdate => User Update: ', req.body);
  User.findByIdAndUpdate(id, {$set: req.body}, function(err, updatedUser) {
    if (err) {
      debug('controllers/user.js:update/User.findByIdAndUpdate => got Error: ', err.errmsg);
      res.send(403, 'controllers/user.js:update/User.findByIdAndUpdate => got Error: ' + err.errmsg );
    } else {
      debug('controllers/user.js:update/User.findByIdAndUpdaate updated User: ', updatedUser);
      debug('controllers/user.js:update/User.findByIdAndUpdaate updated fields: ', req.body);
      res.jsonp(updatedUser);
    }
  });
};

/**
 * Delete an user
 */
exports.destroy = function(req, res, id) {
  var user = User.findByIdAndRemove(id, function(err, query) {
    if (err) {
      res.send(403, "controllers/user.js:destroy/User.findByIdAndUpdate => error." + err);
    } else {
      res.jsonp(query);
    }
  });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
  User.find().sort('-created').exec(function(err, users) {
    if (err) {
      debug("controllers/user.js:all/User.find error => error ", err);
      res.send(400, 'controllers/user.js:all/User.find error.' + err );
    } else {
      res.jsonp(users);
    }
  });
};
