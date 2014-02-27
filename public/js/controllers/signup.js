'use strict';

angular.module('app')
.controller('SignUpController', ["$scope", '$location', '$http', 'Sanitizer', 'CookieService',
  
  function($scope, $location, $http, Sanitizer, CookieService){
    
    //TODO:  Check to see if there is a valid session token stored and redirect automatically
    $scope.failedLogin = false;
    $scope.signUp = function(){
      
      var credentials = {
        username: $scope.email,
        password: $scope.password,
        organization: $scope.organization
      };
      credentials = Sanitizer.sanitize(credentials);

      console.log('Adding user to database: ', credentials);
      $http.post('/signup', credentials)
      .success(function(user){
        console.log('User added to database:\n', user);
        //store cookies
        CookieService.storeCookies(user);
        //redirect
        $location.path( "/dashboard" );
      })
      .error(function(error){
        console.log('ERROR:\n', error);
        $scope.failedLogin = true;
        $scope.email = null;
        $scope.password = null;
        $scope.organization = null;
      });

    };

    $scope.splashPage = function(){
      $location.path( "/" );
    };
    
  }]);
