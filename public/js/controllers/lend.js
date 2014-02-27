angular.module('app')
.controller('LendController', 
["$scope", '$location', 'LendRequest', 'CookieService',
function($scope, $location, LendRequest, CookieService){

  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  //load loans from db
  $scope.loansLoaded = false;
  LendRequest.getLoans($scope.session_token, $scope.user_id)
  //success
  .then(function(loans){
    $scope.loans = loans;
    $scope.loansLoaded = true;
    console.log(loans);
  },
  //error 
  function(error){
    console.log(error);
  });

  $scope.viewDetails = function(id) {
    $location.path( "/lend/"+id );
  };

  $scope.enlargePhotoURL = function(url){
    return url.replace('\/s\/', '/l/');
  };

}]);