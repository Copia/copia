angular.module('app')
.controller('LendController', 
["$scope", '$location', 'LendRequest',
function($scope, $location, LendRequest){

  //load loans from db
  LendRequest.getLoans()
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