'use strict';

// User routes use user service
var user_service = require('../services/user_service');
var users = require('../controllers/users');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

    app.get('/', function(req, res){
        // TODO - do we want to 'render' or serve a fixed asset?
        res.render('index');
    });

    app.post('/login', users.login); //call user controller method);

    app.post('/signup', user_service.signup);

    app.post('/account', authentication.router_auth, user_service.account);

    app.post('/logout', authentication.router_auth, user_service.logout);

    app.get('/venmo_login', authentication.router_auth, user_service.authorizeVenmo);

    //redirect from venmo
    app.post('/auth', authentication.oauth2, user_service.addVenmoToUser);

    app.get('/dashboard', authentication.router_auth, function(request, response) {
      response.send('Welcome to Copia!!!');
    });

    app.post('/users/:userId/:update', authentication.router_auth, user_service.get);

    app.get('/users/:userId', authentication.router_auth, user_service.get);

    app.get('/users', authentication.router_auth, user_service.listAll)

    app.delete('/users/:userId', user_service.delete);

    app.put('/users/:userId', user_service.update);

    // TEST ROUTES TO VERIFY CRUD 
    // app.post('/_users', user_service.create);
    // app.get('/_users/:userId', user_service.get);
    // app.delete('/_users/:userId', user_service.delete);
    // app.put('/_users/:userId', user_service.update);
    // app.get('/_users', user_service.listAll);
};
