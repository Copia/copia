var app = angular.module('app', [
  'ngRoute',
  "ui.bootstrap"
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      }).
      when('/dashboard', {
        templateUrl: 'views/users/dashboard.html',
        controller: 'DashboardController'
      }).
      when('/borrow', {
        templateUrl: 'views/borrow.html',
        controller: 'BorrowController'
      }).
      when('/borrow_confirmation', {
        templateUrl: 'views/borrowConfirm.html',
        controller: 'BorrowConfirmController'
      }).
      when('/lend', {
        templateUrl: 'views/lend.html',
        controller: 'LendController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);