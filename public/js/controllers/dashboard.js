angular.module('app')
.controller('DashboardController', ["$scope", 'CookieService', 'VenmoAuthentication', '$location', 'ModifyUser', '$rootScope', 'LendRequest', '$timeout',
function($scope, CookieService, VenmoAuthentication, $location, ModifyUser, $rootScope, LendRequest, $timeout){
  $rootScope.navbar = true;
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;
  $rootScope.venmoConnected = true;
  $rootScope.showDashboard = false;


  ModifyUser.getUser(cookies).then(function(userObj){
    $scope.user = userObj.user;
    if($scope.user.user) {
       $scope.user.user.profile_picture_url = $scope.user.user.profile_picture_url.replace('\/s\/', '/l/');
    }
    $scope.loan = userObj.loans;
    console.log(userObj);
  });

  $scope.venmoAuth = function(){
    // VenmoAuthentication.authenticate($scope.user_id, $scope.session_token);
    var url = '/venmo_login?session_token=' + $scope.session_token + '&userId=' + $scope.user_id;
    
    window.location.href = window.location.origin + url;
  };

  $scope.repayLoan = function(){
    LendRequest.repayLoan($scope.loan[0]._id, $scope.session_token, $scope.user_id);
  };

  window.showmethemoney = function(){
    $timeout(function(){$rootScope.showDashboard = false;},0);
  }

}]);

