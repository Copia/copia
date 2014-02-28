'use strict';
var express      = require("express");
var mongoose     = require("mongoose");
var config       = require("./package.json").config;
var users        = require("./app/models/user");
var loans        = require("./app/models/loan");
var transactions = require("./app/models/transaction");
var path         = require("path");
var q            = require("q");
var db           = require("./app/db/init");

// instantiate expressjs app
var app = express();

// Set up serving up of static resources and server side dynamic views
var rootPath = path.normalize(__dirname );

// Set up some standard express middleware
app.use( express.bodyParser() );
app.use( app.router );
app.use( express.static( rootPath + '/public') );

// Connect to database
db.connect(app);

// Get routes and models
require('./app/routes/global')(app);
require('./app/routes/loans')(app);
require('./app/routes/transactions')(app);
require('./app/routes/users')(app);

// Use command line port, if no the one in package.json/config
var port = Number(process.env.PORT || config.port);

// Start server
var server = app.listen(port);

app.cleanup = function() {
  server._connections=0 ;
  mongoose.connection.close();
  process.exit();
};

module.exports = app;
