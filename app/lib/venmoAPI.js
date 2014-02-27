'use strict';

var https_service = require('request'),
              url = require('url'),
           config = require('../../package.json').config;


exports.postPayment = function(data, cb) {
  var venmoUrl = 'https://api.venmo.com/v1/payments';

  if (config.stubVenmo) {
    cb(null, null, 'VenmoStub' )
  } else {
    https_service({
      method : "POST",
      url : venmoUrl,
      form : data
    }, function(err, response, body) {
      cb(err, response, body);
    });
  }
};
