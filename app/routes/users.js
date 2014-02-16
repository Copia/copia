'use strict';

// User routes use users controller
var users = require('../controllers/users');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

    var venmoUrl = 'https://api.venmo.com/v1/oauth/authorize?';
    venmoUrl += 'client_id=1608';
    venmoUrl += '&scope=make_payments';
    venmoUrl += '%20access_feed';
    venmoUrl += '%20access_profile';
    venmoUrl += '%20access_email';
    venmoUrl += '%20access_phone';
    venmoUrl += '%20access_balance';
    venmoUrl += '%20access_friends';
    venmoUrl += '&response_type=code';

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/login', function(request, response) {
        console.log('NEED TO REMEMBER THIS TO AVOID EVIL /auth');
        response.redirect(307, venmoUrl);
    });

    app.get('/auth', authentication.oauth2, function(request, response) {
        console.log( 'From Venmo:', request.body );
        console.log('God as my witness, your passage has been granted');
    });

    app.get('/dashboard', function(request, response) {
        console.log('Thank you for using Copia');
        response.send('Welcome to Copia!!!');
    });
    app.get('/users/:userId', function(request, response){
        users.user(request, response, request.params.userId);
    });

    app.post('/users', function(request, response) {
        console.log('POST: ', request.body);
        users.create( request, response );
    });
};
