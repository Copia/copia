'use strict';

angular.module('app')
.controller('SignInController', ["$scope", '$location', '$http', 'Sanitizer', 'CookieService',
  
  function($scope, $location, $http, Sanitizer, CookieService){
    //TODO:  Check to see if there is a valid session token stored and redirect automatically
    $scope.failedLogin = false;

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
        //store cookies
        CookieService.storeCookies(user);

        //redirect
        $location.path( "/dashboard" );
      })
      .error(function(error){
        $scope.failedLogin = true;
        $scope.email = null;
        $scope.password = null;
        console.log('ERROR:\n', error);
      });


    };

    $scope.splashPage = function(){
      $location.path( "/" );
    };

}]);