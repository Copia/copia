angular.module('app')
.controller('LendController', 
["$scope", '$location', 'LendRequest', '$cookieStore',
function($scope, $location, LendRequest, $cookieStore){

  $scope.token = $cookieStore.get('session_token');

  //load loans from db
  LendRequest.getLoans($scope.token)
  //success
  .then(function(loans){
    $scope.loans = loans;
  },
  //error 
  function(error){
    console.log(error);
  });

  $scope.viewDetails = function(id) {
    $location.path( "/lend/"+id );
  }

}]);