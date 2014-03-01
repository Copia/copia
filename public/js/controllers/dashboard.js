'use strict';

angular.module('app')
.controller('DashboardController', ["$scope", 'CookieService', 'VenmoAuthentication', '$location', 'ModifyUser', '$rootScope', 'LendRequest', '$timeout', '$route',
function($scope, CookieService, VenmoAuthentication, $location, ModifyUser, $rootScope, LendRequest, $timeout, $route){
  $rootScope.navbar = true;
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;
  $rootScope.venmoConnected = true;
  $rootScope.showDashboard = false;

  
  ModifyUser.getUser(cookies).then(function(userObj){
    $scope.user = userObj.user;
    if ($scope.user.user) {
      $scope.user.user.profile_picture_url = $scope.user.user.profile_picture_url.replace('\/s\/', '/l/');
    }
    $scope.loan = userObj.loans;
    if ($scope.loan.length > 0){
      for (var i = 0; i < $scope.loan.length; i++) {
        if ($scope.loan[i].status === 'pending') {
          $scope.borrower = true;
          $scope.pending = true;
          $scope.borrowStatus = 'Pending';
          $scope.borrowColor = {'color': 'red'};
          $scope.loanView = $scope.loan[i];
        }
        if ($scope.loan[i].status === 'funded'){
          $scope.pending = false;
          $scope.borrower = true;
          $scope.borrowStatus = 'Funded';
          $scope.borrowColor = {'color':'black'};
          $scope.loanView = $scope.loan[i];
        } 
      }
    }
  });

  $scope.cancelLoan = function(){
    for(var i=0; i<$scope.loan.length; i++) {
      if ($scope.loan[i].status === 'pending') {
        break;
      }
    }
    LendRequest.cancelLoan($scope.loan[i]._id, $scope.session_token, $scope.user_id).then(function() {$timeout(function() {$route.reload();},0);});
  };

  $scope.venmoAuth = function(){
    // VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
    var url = '/venmo_login?session_token=' + $scope.session_token + '&userId=' + $scope.user_id;
    
    window.location.href = window.location.origin + url;
  };

  $scope.repayLoan = function(){
    LendRequest.repayLoan($scope.loanView._id, $scope.session_token, $scope.user_id).then(function() {$timeout(function() {$route.reload();},0);});
  };

}]);

