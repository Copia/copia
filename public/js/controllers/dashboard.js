angular.module('app')
.controller('DashboardController', ["$scope", 'CookieService', 'VenmoAuthentication',
function($scope, CookieService, VenmoAuthentication){

  $scope.venmoConnected = false;
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  $scope.venmoAuth = function(){
    VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
  };

}]);

