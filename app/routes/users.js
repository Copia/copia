'use strict';

// User routes use user service
var user_service = require('../services/user_service');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

    app.get('/', function(req, res){
        // TODO - do we want to 'render' or serve a fixed asset?
        res.render('index');
    });

    app.post('/venmo_login', user_service.venmo_login);

    app.get('/login', //authMW//
     user_service.login);

    app.post('/logout', //authMW//
     user_service.logout);

    //redirect from venmo
    app.get('/auth', authentication.oauth2, user_service.create);

    // TODO - don't remember what this route was for
    // app.post('/auth' //authMW//
    //   );

    app.post('/auth_test', user_service.create);

    app.get('/dashboard', function(request, response) {
        response.send('Welcome to Copia!!!');
    });

    app.get('/users/:userId', user_service.get);

    app.post('/users/:userId/:update', user_service.get);

};
