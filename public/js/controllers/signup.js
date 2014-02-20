angular.module('app')
.controller('SignUpController', ["$scope", '$location', '$http',
  
  function($scope, $location, $http){
    
    $scope.signUp = function(){
      var data = {
        access_token: null,
        balance: null,
        expires_in: null,
        user: null,
        username: $scope.email,
        organization: null,
        password_hash: $scope.password,
        password_salt: null,
        session_token: null,
        karma: 0,
        refresh_token: null
      };
      $http.post('/signup', data).success(function(){
        console.log($scope.email, $scope.password)  
      });
    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };
      

}]);