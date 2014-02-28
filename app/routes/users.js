'use strict';

// User routes use user service
var user_service = require('../services/user_service');
var users = require('../controllers/users');
var authentication = require('./middleware/authentication');

module.exports = function(app) {

  app.get('/', function(req, res){
    res.sendfile('public/index.html');
  });

  app.post('/login', users.login);

  app.post('/signup', user_service.signup);

  app.post('/account', authentication.router_auth, user_service.account);

  app.post('/logout', authentication.router_auth, user_service.logout);

  app.get('/venmo_login', authentication.router_auth, user_service.authorizeVenmo);

  app.post('/auth', authentication.oauth2, user_service.addVenmoToUser);

  app.get('/dashboard', authentication.router_auth, function(request, response) {
    response.send('Welcome to Copia!!!');
  });

  app.post('/users/:userId/:update', authentication.router_auth, user_service.get);

  app.get('/users/:userId', authentication.router_auth, user_service.get);

  app.get('/users', authentication.router_auth, user_service.listAll);

  app.delete('/users/:userId', user_service.delete);

  app.put('/users/:userId', user_service.update);

};
