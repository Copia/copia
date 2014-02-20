angular.module('app')
.controller('SplashPageController', ["$scope", '$location',
  
  function($scope, $location){
  
      $scope.signUp = function(){
        $location.path( "/signup" );
      };

      $scope.signIn = function(){
        $location.path( "/signin" );
      };

}]);