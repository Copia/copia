'use strict';

// User routes use user service
var user_service = require('../services/user_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

    app.get('/', function(req, res){
        // TODO - do we want to 'render' or serve a fixed asset?
        res.render('index');
    });

    app.get('/login', user_service.login);

    app.post('/signup', user_service.signup);

    app.post('/account', authentication.router_auth, user_service.account);

    app.post('/logout', authentication.router_auth, user_service.logout);

    //redirect from venmo
    app.get('/auth', authentication.oauth2, user_service.create);

    app.get('/dashboard', authentication.router_auth, function(request, response) {
        response.send('Welcome to Copia!!!');
    });

    app.post('/users/:userId/:update', authentication.router_auth, user_service.get);

    app.get('/users/:userId', authentication.router_auth, user_service.get);

};
