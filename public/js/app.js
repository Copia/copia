var app = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'ngSanitize'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexController'
      }).
      when('/splashPage', {
        templateUrl: 'views/splashPage.html',
        controller: 'SplashPageController'
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
      otherwise({
        redirectTo: '/'
      });
  }
]);
