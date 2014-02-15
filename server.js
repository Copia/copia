var express = require("express");
var mongoose = require("mongoose");
var users = require("./app/models/user");
var db  = mongoose.connect('mongodb://localhost/copia');
var app = express();

require('./config/express')(app);

var admins =  require('./app/routes/users')(app);

app.listen(3000);

