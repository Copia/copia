angular.module('app')
.controller('DashboardController', ["$scope", '$cookieStore',
function($scope, $cookieStore){

  $scope.venmoConnected = false;
  $scope.token = $cookieStore.get('session_token');

  $scope.venmoAuth = function(){
    
  };

}]);