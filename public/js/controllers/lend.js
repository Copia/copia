angular.module('app')
.controller('LendController', 
["$scope", 'LendRequest',
function($scope, LendRequest){

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
  
  

}]);