'use strict';

// User service use users controller
var mongoose = require('mongoose'),
        User = mongoose.model('User'),
        Loan = mongoose.model('Loan');

var users = require('../controllers/users');
var uuid = require('node-uuid');
var venmoUrl = 'https://api.venmo.com/v1/oauth/authorize?';
venmoUrl += 'client_id=1608';
venmoUrl += '&scope=make_payments';
venmoUrl += '%20access_feed';
venmoUrl += '%20access_profile';
venmoUrl += '%20access_email';
venmoUrl += '%20access_phone';
venmoUrl += '%20access_balance';
venmoUrl += '%20access_friends';
venmoUrl += '&response_type=code';

exports.create = function(request, response, body) {
  users.create(request, response);
  // window.location.href = 'https://copia.ngrok.com/#/';
};

exports.authorizeVenmo = function(request, response) {
  response.redirect(307, venmoUrl);
};

exports.addVenmoToUser = function(request, response) {
  users.addUserToVenmo(request, response);
};

exports.listAll = function(request, response) {
  users.all(request, response);
};

exports.signup = function(request, response) {
  users.create(request, response);
};

exports.logout = function(request, response) {
  console.log('GET User: ', request.body.userId, request.authenticated_user._id);
  users.update( {body: { session_token: null } }, response, request.authenticated_user._id);
};

exports.account = function(request, response) {
  response.redirect(307, venmoUrl);
};

exports.update = function(request, response) {
  users.update(request, response, request.params.userId);
};

exports.get = function(request, response) {
  console.log('user_service.js/get => GET User: ', request.params.userId);
//  users.get(request, response, request.params.userId);
  User.findById(request.params.userId, function(err, user) {
    if (err) {
      console.log('controllers/user.js:User.findById => got error ' + err);
      response.send(400,'controllers/user.js:User.findById => got error ' + err);
    } else {
      Loan.find({ borrower_id: request.params.userId })
      //.where('status').in(["pending", "funded"])
      .exec( function(err, loans) {    
        if (err) {
          console.log("user_service.js/get/User.findById/Loan.find => error fetching user loans", err);
          return response.send(400, "user_service.js/get/User.findById/Loan.find => error fetching user loans" + err);
        }
        console.log('user_service/get/Loan.find => Found loans for user : ', loans);
        user.loans = loans; 
        console.log('user_service/get/Loan.find => Complete user object : ', user);
        response.jsonp( {user: user, loans: loans} );
      });
    }
  });
};

exports.delete = function(request, response) {
  users.destroy(request, response, request.params.userId);
};
