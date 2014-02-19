'use strict';

// User service use users controller
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
  //check if user exists?

  // request.body.karma = 0;
  // request.body.session_token = "This_will_be_a_session_token";
  console.log("USER_SERVICE: create user: ",request.body);
  users.create(request, response);
  response.redirect('/#dashboard');
};

exports.login = function(request, response) {
  //expect a user session token from auth MW
  //for now redirect to venmo login page
  response.redirect(307, venmoUrl);
  

};

exports.logout = function(request, response) {
  // TODO - delete  session token
  console.log('User logged out - to be implemented');
};

exports.venmo_login = function(request, response) {
  response.redirect(307, venmoUrl);
};

exports.update = function(request, response) {
  users.update(request, response);
};

exports.get = function(request, response) {
  console.log(request.params.userId);
  users.user(request, response, request.params.userId);
};

exports.delete = function(request, response) {
  users.destroy(request, response);
};