angular.module('app')
.controller('SignUpController', ["$scope", '$location',
  
  function($scope, $location){
    
    $scope.signUp = function(){
      console.log($scope.email, $scope.password);
    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };
      

}]);