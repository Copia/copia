angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService){
  $scope.signUp = function(){
    $location.path( "/signup" );
  };

  $scope.logout = function(){
    CookieService.eatCookies();
    $location.path( "/" );
  };
});