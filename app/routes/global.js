"use strict";
var debug = require('debug');

module.exports = function(app) {
  // service availability middleware
  app.all('*', function(request, response, next) {
    if (!app.available) {
      return response.send(503, 'Service Not Available');
    } else {
      next();
    }
  });
  //// Error handling middleware
  app.use(function(err, request, response, next) {
    if(err) {
      debug('server.js:errMiddleware => error.', err);
      response.send(err);
    } else {
      debug('server.js/healthMiddleware => health Ok');
      next();
    }
  });
};
