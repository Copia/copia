'use strict';
var express = require("express");
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = function(app) {

  // TODO: DO NOT USE THE bodyParser IN PRODUCTION!
  app.use( express.bodyParser() );

  app.use( app.router );
  app.use( express.static( rootPath + '/copia/public') );
};
