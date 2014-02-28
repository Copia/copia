'use strict';

angular.module('app')
.controller('NavbarController',  
function($scope, $location, CookieService, ModifyUser, $rootScope){

  if (!$rootScope.loggedIn){
    var cookies = CookieService.getCookies();
    if (cookies.session_token && cookies.user_id){
      $rootScope.loggedIn = true;
      $location.path('/dashboard');
    }
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