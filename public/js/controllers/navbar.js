angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser){
  
  if ($location.path() !== '/'){
    $scope.navbar = true;
  }

  $scope.home = function(){
    $location.path( "/dashboard" );
  };

  $scope.logout = function(){
    ModifyUser.logoutUser(CookieService.getCookies());
    CookieService.eatCookies();
    $location.path( "/" );
  };

});