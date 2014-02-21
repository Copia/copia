angular.module('app')
.controller('LoanController', 
["$scope", '$location', 'LendRequest',
function($scope, $location, LendRequest){
  $scope.loan = null;
  
  var loanId = $location.path().slice($location.path().lastIndexOf('/')+1);

  //load loan from db
  LendRequest.getLoan(loanId)
  //success
  .then(function(loan){
    $scope.loan = loan;
  },
  //error 
  function(error){
    console.log(error);
  });

}]);