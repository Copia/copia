'use strict';

var https_service = require('request'),
              url = require('url');


exports.postPayment = function(data, cb) {
  var venmoUrl = 'https://api.venmo.com/v1/payments';

  https_service({
    method : "POST",
    url : venmoUrl,
    form : data
  }, function(err, response, body) {
    //var body = JSON.parse( body );
    console.log(response, body);
  });
};
