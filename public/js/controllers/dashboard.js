angular.module('app')
.controller('DashboardController', ["$scope", '$cookieStore', 'VenmoAuthentication',
function($scope, $cookieStore, VenmoAuthentication){

  $scope.venmoConnected = false;
  $scope.session_token = $cookieStore.get('session_token');
  $scope.user_id = $cookieStore.get('user_id');

  $scope.venmoAuth = function(){
    VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
  };

}]);