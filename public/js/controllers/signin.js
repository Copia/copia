angular.module('app')
.controller('SignInController', ["$scope", '$location',
  
  function($scope, $location){
  
    $scope.signIn = function(){
      console.log($scope.email, $scope.password);
    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };

}]);