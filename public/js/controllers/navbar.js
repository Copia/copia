angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser, $rootScope){
  
  if ($location.path() !== '/'){
    $rootScope.navbar = true;
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