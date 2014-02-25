angular.module('app')
.controller('DashboardController', ["$scope", 'CookieService', 'VenmoAuthentication', '$location', 'CheckUser', '$rootScope',
function($scope, CookieService, VenmoAuthentication, $location, CheckUser, $rootScope){
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  
  CheckUser.getUser(cookies).then();
  


  $scope.venmoAuth = function(){
    // VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
    var url = '/venmo_login?session_token=' + $scope.session_token + '&userId=' + $scope.user_id;
    
    window.location.href = window.location.origin + url;
  };

}]);

