angular.module('app')
.controller('SignInController', ["$scope", '$location',
  
  function($scope, $location){

    var credentials = {
      email: $scope.email,
      password: $scope.password
    };

    credentials = Sanitizer.sanitize(credentials);
  
    $scope.signIn = function(){
      console.log(credentials);
    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };

}]);