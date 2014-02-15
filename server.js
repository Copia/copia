var express = require("express");
var mongoose = require("mongoose");
var users = require("./app/models/user");
var db  = mongoose.connect('ds033569.mongolab.com:33569/heroku_app22242686');
var consolidate = require('consolidate');
var app = express();

require('./config/express')(app);

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

var admins =  require('./app/routes/users')(app);

app.listen(3000);

