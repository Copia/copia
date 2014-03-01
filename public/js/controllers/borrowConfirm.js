'use strict';

angular.module('app')
.controller('BorrowConfirmController', 
["$scope", '$location', 'CookieService', '$rootScope', '$http',
function($scope, $location, CookieService, $rootScope, $http){
  //send user back to /borrow if the current loan attributes are not valid for loan confirmation
  if(!$rootScope.validLoanAttrs) {
    $location.path( "/borrow" );
  }

  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  $scope.submitBorrowRequest = function(){
    //Route to post new loans:  /users/:userId/loans
    $rootScope.loan.matched = false;
    $http.post('/users/'+$scope.user_id+'/loans', {session_token : $scope.session_token, loan : $rootScope.loan})
    .success(function(data, status, headers, config) {
      $location.path( "/dashboard" );
    })
    .error(function(data, status, headers, config) {
      console.error('Error: ', data);
      $location.path( "/dashboard" );
    });
  };

  $scope.cancel = function(){
    $rootScope.loan.principal = null;
    $rootScope.loan.payback_amount = null;
    $rootScope.loan.match_deadline = null;
    $rootScope.loan.payback_days = null;
    $rootScope.loan.category = null;
    $rootScope.loan.reason = null;
    $location.path( "/dashboard" );
  };
}]);