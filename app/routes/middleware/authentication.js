'use strict';
var https_service = require('request'),
              url = require('url'),
           config = require('../../../package.json').config,
         mongoose = require('mongoose'),
             User = mongoose.model('User');

exports.oauth2 = function( request, response, next) {
    var venmoUrl = 'https://api.venmo.com/v1/oauth/access_token';
    var parsedUrl = url.parse(request.url, true)

    console.log( 'authentication.js/oauth2 => REQUEST BODY in OAuth2:', request.body );
    if (!request.body || !request.body.userId || !request.body.venmoCode) { 
      console.log('could not find the userId or venmoCode in OAuth2');
       return next(400, 'authentication.js/oauth2 => Need userId and venmoCode in OAuth2 POST');
    } 
    var userId = request.body.userId; 
    var authCode = request.body.venmoCode; 
    console.log('AuthCode: ', authCode);
    var data = {
      "client_id": "1608",
      "client_secret": "CxVegjzgjB5UteXBqnpMCFZkbKb9dGTc",
      "code": authCode
    };
    https_service({
      method: "POST",
      url : venmoUrl, 
      form :  data
    }, function(err, resp, body){
        var body = JSON.parse( body );
        if(err || body.error || !body.access_token) {
          console.log('authentication.js/oauth2 => INVALID ACCESS:');
          response.redirect(301, '/login');
        } else {
          console.log("authentication.js/oauth2 => AUTH SUCCESSFUL");
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
    console.log('authentication.js/router_auth => error ID not provided. Id: ', id)
    return next(401, 'authentication.js/router_auth => Invalid user id');
  }
  var token = request.params.session_token || request.query.session_token || request.body.session_token;

  console.log('Id: ', id, 'Token: ', token);
  User.findById(id, "authentication.js/router_auth => session_token", function(err, user) {
    if(err) {
      console.log("authentication.js/router_auth:User.findById => Error: ", err);
      response.send(404, 'authentication.js/router_auth:User.findById => Error authenticating');
    }
    else if (!user || user.session_token !== token) {
      console.log("authentication.js/router_auth:User.findById => Login Error.");
      console.log("user: ", user);
      return next(401, 'Not Authorized - ' +  token);
    } else {
      console.log("authentication.js/router_auth:User.findById => Found User: ",user);
      console.log('authentication.js/router_auth:User.findById => Authenticated User session_token: ', user.session_token );
      request.authenticated_user = user;
      next();
    }
  });
};
