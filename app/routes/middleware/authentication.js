'use strict';
var https_service = require('request'),
    url = require('url'),
    config = require('../../../package.json').config,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.oauth2 = function( request, response, next) {
    var venmoUrl = 'https://api.venmo.com/v1/oauth/access_token';
    var parsedUrl = url.parse(request.url, true)
    var authCode = parsedUrl.query.code;   

    var data = {
      "client_id": "1608",
      "client_secret": "CxVegjzgjB5UteXBqnpMCFZkbKb9dGTc",
      "code": authCode
    };
    console.log(data);
    https_service({
      method: "POST",
      url : venmoUrl, 
      form :  data
    }, function(err, resp, body){
        var body = JSON.parse( body );
        if(err || body.error || !body.access_token) {
          console.log('INVALID ACCESS:', body.error.message, '( Code ', body.error.code, ')');
          response.redirect(301, '/login');
        } else {
          console.log("AUTH SUCCESSFUL");
          request.body = body;
          next();
        }
    });

};

exports.router_auth = function(request, response, next) {
  //get id from request, check session_token
  var id = request.body.id;
  var token = request.body.session_token;
  console.log("router_auth ID/token: ", id, token);
  User.findById(id, "session_token", function(err, user) {
    console.log("FOUND USER: ",user);
    if(err) console.log("ERROR");
    else if (user.session_token !== token) {}; //do something}
    console.log(user.session_token === token);
    next();
  });
  if (config.debug) {
    console.log('Authentication Middleware', request.params);
  }

};
