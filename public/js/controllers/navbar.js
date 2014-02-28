'use strict';

angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser, $rootScope){

  var cookies = CookieService.getCookies();

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