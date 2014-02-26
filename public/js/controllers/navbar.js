angular.module('app')
.controller('NavbarController', 
["$scope", '$location', 
function($scope, $location){
  $scope.signUp = function(){
    $location.path( "/signup" );
  };

  $scope.logout = function(){
    $location.path( "/logout" );
  };
}]);