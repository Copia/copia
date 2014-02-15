'use strict';
var https_service = require('request');
var url = require('url');

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
        if(err) {
          response.send('Quit hacking us ');
        } else {
          response.redirect(301, '/dashboard');
        }

    });
    next();
};