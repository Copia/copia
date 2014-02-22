angular.module('app')
.controller('SignUpController', ["$scope", '$location', '$http', 'Sanitizer',
  
  function($scope, $location, $http, Sanitizer){
    
    $scope.signUp = function(){
      
      var credentials = {
        username: $scope.email,
        password: $scope.password
      };
      credentials = Sanitizer.sanitize(credentials);

      console.log('Adding user to database: ', credentials);
      $http.post('/signup', credentials)
      .success(function(user){
        console.log('User added to database:\n', user);
      })
      .error(function(error){
        console.log('ERROR:\n', error);
      });

    };

    $scope.splashPage = function(){
      $location.path( "/" );
    };
      

}]);