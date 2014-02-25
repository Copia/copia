angular.module('app')
.controller('SignInController', ["$scope", '$location', '$http', 'Sanitizer', "$cookieStore",
  
  function($scope, $location, $http, Sanitizer, $cookieStore){

    //TODO:  Check to see if there is a valid session token stored and redirect automatically

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
        $cookieStore.put('session_token', user.session_token);
        $cookieStore.put('user_id', user._id);
        //redirect
        $location.path( "/dashboard" );
      })
      .error(function(error){
        console.log('ERROR:\n', error);
      });


    };

    $scope.splashPage = function(){
      $location.path( "/" );
    };

}]);