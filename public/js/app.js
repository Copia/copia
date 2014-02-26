var app = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize',
  'ngCookies'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      }).
      when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SignInController'
      }).
      when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpController'
      }).
      when('/dashboard', {
        templateUrl: 'views/dashboard.html',
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
      when('/lend/:loanId', {
        templateUrl: 'views/loanDetails.html',
        controller: 'LoanController'
      }).
      when('/auth', {
        templateUrl: 'views/venmoAuth.html',
        controller: 'VenmoAuthController'
      }).
      when('/logout', {
        templateUrl: 'views/index.html',
        controller: 'LogoutController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
