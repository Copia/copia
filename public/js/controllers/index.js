angular.module('app')
.controller('IndexController', ["$scope", function($scope){
  $scope.signIn = function(){
    console.log('sign in');
  }
}]);