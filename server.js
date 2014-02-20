var express     = require("express");
var mongoose    = require("mongoose");
var config      = require('./package.json').config;
var users       = require("./app/models/user");
var loans       = require("./app/models/loan");
var transactions = require("./app/models/transaction");
var consolidate = require('consolidate');
var path        = require('path');

// instantiate expressjs app
var app = express();

// Set up serving up of static resources and server side dynamic views
var rootPath = path.normalize(__dirname );
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');

// Set up some standard express middleware
app.use( express.bodyParser() );
app.use( app.router );
app.use( express.static( rootPath + '/public') );

// Connect to database
var db  = mongoose.connect(config.db);

// Get routes and models
require('./app/routes/loans')(app);
require('./app/routes/transactions')(app);
require('./app/routes/users')(app);

// Use command line port, if no the one in package.json/config
var port = Number(process.env.PORT || config.port);

// Start server
app.listen(port);