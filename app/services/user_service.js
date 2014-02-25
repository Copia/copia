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
  users.create(request, response);
  // window.location.href = 'https://copia.ngrok.com/#/';
};

// exports.login = function(request, response) {
//   //expect a user session token from auth MW
//   //for now redirect to venmo login page
//   // TODO: remove this redirect, verify user auth by
//   // looking up email/username + password and generating
//   // token if match, or 401 if not.
//   response.redirect(307, venmoUrl);

// };

exports.authorizeVenmo = function(request, response) {
  response.redirect(307, venmoUrl);
}

exports.addVenmoToUser = function(request, response) {
  users.addUserToVenmo(request, response)
}

exports.listAll = function(request, response) {
  users.all(request, response);
}

exports.signup = function(request, response) {
 // TODO: create the user account
 // QUESTION: how is this functionality different than create, above?
 // the following is TEMPORARY for TESTING
    users.create(request, response);
};

exports.logout = function(request, response) {
  // TODO - delete  session token
  console.log('User logged out - to be implemented');
};

exports.account = function(request, response) {
  
  response.redirect(307, venmoUrl);
};

exports.update = function(request, response) {
  users.update(request, response, request.params.userId);
};

exports.get = function(request, response) {
  console.log('GET User: ', request.params.userId);
  users.get(request, response, request.params.userId);
};

exports.delete = function(request, response) {
  users.destroy(request, response, request.params.userId);
};