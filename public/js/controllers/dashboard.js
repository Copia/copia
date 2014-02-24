angular.module('app')
.controller('DashboardController', ["$scope", '$cookieStore',
function($scope, $cookieStore){

  $scope.token = $cookieStore.get('session_token');

}]);