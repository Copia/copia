angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser, $rootScope){
  

  $scope.isCollapsed = true;
  $scope.toggleNavbar = function(){
    $scope.isCollapsed = !$scope.isCollapsed;
  }

  if ($location.path() !== '/'){
    $rootScope.navbar = true;
  }

  $scope.home = function(){
    $location.path( "/dashboard" );
  };

  $scope.logout = function(){
    ModifyUser.logoutUser(CookieService.getCookies());
    CookieService.eatCookies();
    $rootScope.navbar = false;
    $scope.isCollapsed = true;
    $location.path( "/" );
  };

});