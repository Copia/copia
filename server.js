var express = require("express");
var mongoose = require("mongoose");
var users = require("./app/models/user");
var loans = require("./app/models/loan");
var db  = mongoose.connect('mongodb://heroku_app22242686:do2856rbauaa0nlb1epfqgj61o@ds033569.mongolab.com:33569/heroku_app22242686');
var consolidate = require('consolidate');
var app = express();

require('./config/express')(app);

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
require('./app/routes/users')(app);
require('./app/routes/loans')(app);


var port = Number(process.env.PORT || 3000);

app.listen(port);

