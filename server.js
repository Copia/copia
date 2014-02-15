var express = require("express");
var mongoose = require("mongoose");
var users = require("./app/models/user");
<<<<<<< HEAD
var db  = mongoose.connect('ds033569.mongolab.com:33569/heroku_app22242686');
var consolidate = require('consolidate');
=======
var db  = mongoose.connect('mongodb://heroku_app22242686:do2856rbauaa0nlb1epfqgj61o@ds033569.mongolab.com:33569/heroku_app22242686');
>>>>>>> Corrected address for db
var app = express();

require('./config/express')(app);

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

var admins =  require('./app/routes/users')(app);

var port = Number(process.env.PORT || 3000);

app.listen(port);

