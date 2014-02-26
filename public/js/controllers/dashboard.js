angular.module('app')
.controller('DashboardController', ["$scope", 'CookieService', 'VenmoAuthentication', '$location', 'ModifyUser', '$rootScope',
function($scope, CookieService, VenmoAuthentication, $location, ModifyUser, $rootScope){
  $rootScope.navbar = true;
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;
  $rootScope.venmoConnected = true;
  $rootScope.showDashboard = false;


  ModifyUser.getUser(cookies).then(function(user){
    $scope.user = user;
    user.user.profile_picture_url = user.user.profile_picture_url.replace('\/s\/', '/l/');
    console.log(user);
  });

  $scope.venmoAuth = function(){
    // VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
    var url = '/venmo_login?session_token=' + $scope.session_token + '&userId=' + $scope.user_id;
    
    window.location.href = window.location.origin + url;
  };

  $scope.repayLoan = function(){

  };

}]);

