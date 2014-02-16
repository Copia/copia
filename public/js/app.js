var app = angular.module('app', [
  'ngRoute'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      }).
      when('/dashboard', {
        templateUrl: 'views/user/dashboard.html',
        controller: 'DashboardController'
      })
      otherwise({
        redirectTo: '/'
      });
  }
]);