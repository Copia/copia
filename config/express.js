'use strict';
var express = require("express");

module.exports = function(app) {

  // TODO: DO NOT USE THE bodyParser IN PRODUCTION!
  app.use( express.bodyParser() );

  app.use( app.router ); 
  app.use( express.static( __dirname + '/public') );
};
