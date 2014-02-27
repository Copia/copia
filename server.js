var express     = require("express");
var mongoose    = require("mongoose");
var config      = require('./package.json').config;
var users       = require("./app/models/user");
var loans       = require("./app/models/loan");
var transactions = require("./app/models/transaction");
var path        = require('path');

// instantiate expressjs app
var app = express();

// Set up serving up of static resources and server side dynamic views
var rootPath = path.normalize(__dirname );

//// Error handling middleware
app.use(function(err, request, response, next) {
  if(err) {
    console.log('server.js:errMiddleware => error.', err);
    response.send(err);
  } else {
    console.log('server.js/healthMiddleware => health Ok');
    next();
  }
});

// Set up some standard express middleware
app.use( express.bodyParser() );
app.use( app.router );
app.use( express.static( rootPath + '/public') );

// Connection event handlers
mongoose.connection.on('open', function() {
  console.log('Database opened', config.db.uri, ' with options ', config.db.options);
  app.available = true;
});

mongoose.connection.on('error', function(err) {
  console.log('server.js => Database connection error', err);
  app.available = false;
});

mongoose.connection.on('disconnected', function(err) {
  console.log('server.js => Database lost connection', err);
  app.available = false;
});

mongoose.connection.on('connected', function() {
  console.log('Database regained connection' );
  app.available = true;
});

// Connect to database
app.db  = mongoose.connect(config.db.uri, config.db.options);

app.all('*', function(request, response, next) {
  if (!app.available) {
    return response.send(503, 'Service Not Available');
  } else {
    next();
  }
});

// Get routes and models
require('./app/routes/loans')(app);
require('./app/routes/transactions')(app);
require('./app/routes/users')(app);

// Use command line port, if no the one in package.json/config
var port = Number(process.env.PORT || config.port);

// Start server
app.listen(port);
