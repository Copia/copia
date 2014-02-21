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
      console.log(credentials);

    };

    $scope.splashPage = function(){
      $location.path( "/splashPage" );
    };
      

}]);