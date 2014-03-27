'use strict';
var debug = require('debug');

var https_service = require('request'),
              url = require('url'),
           config = require('../../../package.json').config,
         mongoose = require('mongoose'),
             User = mongoose.model('User');

exports.oauth2 = function( request, response, next) {
  var venmoUrl = 'https://api.venmo.com/v1/oauth/access_token';
  var parsedUrl = url.parse(request.url, true);

  debug( 'authentication.js/oauth2 => REQUEST BODY in OAuth2:', request.body );
  if (!request.body || !request.body.userId || !request.body.venmoCode) { 
    debug('could not find the userId or venmoCode in OAuth2');
    next(400, 'authentication.js/oauth2 => Need userId and venmoCode in OAuth2 POST');
  } 
  var userId = request.body.userId; 
  var authCode = request.body.venmoCode; 
  debug('AuthCode: ', authCode);
  var data = {
    "client_id": "1608",
    "client_secret": "CxVegjzgjB5UteXBqnpMCFZkbKb9dGTc",
    "code": authCode
  };
  https_service({
    method: "POST",
    url : venmoUrl, 
    form :  data
  }, function(err, resp, data){
    var body = JSON.parse( data );
    if(err || body.error || !body.access_token) {
      debug('authentication.js/oauth2 => INVALID ACCESS:');
      response.redirect(301, '/login');
    } else {
      debug("authentication.js/oauth2 => AUTH SUCCESSFUL \n\n\n",body, "\n\n\n\n" );
      request.body = body;
      request.userId = userId;
      next();
    }
  });
};

exports.router_auth = function(request, response, next) {
  //get id from request, check session_token
  var id = request.params.userId || request.query.userId || request.body.userId;
  if (!id) {
    debug('authentication.js/router_auth => error ID not provided. Id: ', id);
    next(401, 'authentication.js/router_auth => Invalid user id');
  }
  var token = request.params.session_token || request.query.session_token || request.body.session_token;

  debug('Id: ', id, 'Token: ', token);
  User.findById(id, function(err, user) {
    if(err) {
      debug("authentication.js/router_auth:User.findById => Error: ", err);
      next(404, 'authentication.js/router_auth:User.findById => Error authenticating');
    }
    else if (!user || user.session_token !== token) {
      debug("authentication.js/router_auth:User.findById => Login Error.");
      debug("user: ", user);
      next(401, 'Not Authorized - ' +  token);
    } else {
      debug("authentication.js/router_auth:User.findById => Found User: ",user);
      debug('authentication.js/router_auth:User.findById => Authenticated User session_token: ', user.session_token );
      request.authenticated_user = user;
      request.authenticated_user_access_token = user.access_token;
      request.authenticated_user_email = user.user && user.user.email;
      next();
    }
  });
};
