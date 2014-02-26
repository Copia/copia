angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser){
  $scope.signUp = function(){
    $location.path( "/signup" );
  };

  $scope.logout = function(){
    ModifyUser.logoutUser(CookieService.getCookies());
    CookieService.eatCookies();
    $location.path( "/" );
  };
});