'use strict';

angular.module('app')
.controller('IndexController', 
["$scope", '$location', 
function($scope, $location){
  $scope.signUp = function(){
    $location.path( "/signup" );
  };

  $scope.signIn = function(){
    $location.path( "/signin" );
  };
}]);