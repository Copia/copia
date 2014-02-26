angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser){
  $scope.home = function(){
    $location.path( "/dashboard" );
  };

  $scope.logout = function(){
    ModifyUser.logoutUser(CookieService.getCookies());
    CookieService.eatCookies();
    $location.path( "/" );
  };
});