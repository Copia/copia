angular.module('app')
.controller('SignUpController', ["$scope", '$location', '$http', 'Sanitizer',
  
  function($scope, $location, $http, Sanitizer){
    
    $scope.signUp = function(){
      
      var credentials = {
        email: $scope.email,
        password: $scope.password
      };

      credentials = Sanitizer.sanitize(credentials);

      // $http.post('/signup', data).success(function(){
      //   console.log($scope.email, $scope.password)  
      // });

    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };
      

}]);