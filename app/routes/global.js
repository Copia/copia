"use strict";
module.exports = function(app) {
  app.all('*', function(request, response, next) {
    if (!app.available) {
      return response.send(503, 'Service Not Available');
    } else {
      next();
    }
  });
};