"use strict";

var mongoose    = require("mongoose");
var config      = require("../../package.json").config;
var db = {};

db.connect = function(app) {
  // Connection event handlers

  mongoose.connection.on('open', function() {
    app.available = true;
  });

  mongoose.connection.on('error', function(err) {
    app.available = false;
    app.emit('out');
  });

  mongoose.connection.on('disconnected', function(err) {
    app.available = false;
    app.emit('out');
  });

  mongoose.connection.on('connected', function() {
    app.available = true;
    app.emit('ready');
  });

  mongoose.connect(config.db.uri, config.db.options);

};

module.exports = db; 
