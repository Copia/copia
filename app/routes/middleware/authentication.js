'use strict';
var https_service = require('request');
var url = require('url');
var config = require('../../../package.json').config;

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
  console.log('In middleware. Config: ', config);
  console.log('config.debug: ', config.debug, 'config.db: ', config.db);
  if (config.debug) {
    console.log('Authentication Middlware', request.body);
  }
  next();

};
