angular.module('app')
.controller('SignInController', ["$scope", '$location', '$http', 'Sanitizer',
  
  function($scope, $location, $http, Sanitizer){

  
    $scope.signIn = function(){
      var credentials = {
        username: $scope.email,
        password: $scope.password
      };
      credentials = Sanitizer.sanitize(credentials);

      console.log('Signing user into database: ', credentials);
      $http.post('/login', credentials)
      .success(function(user){
        console.log('User signed in:\n', user);
      })
      .error(function(error){
        console.log('ERROR:\n', error);
      });


    };

    $scope.splashPage = function(){
      $location.path( "/" );
    };

}]);