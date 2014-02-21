angular.module('app')
.controller('LoanController', 
["$scope", '$location', 'LendRequest',
function($scope, $location, LendRequest){
  $scope.loan = null;
  $scope.getRequestComplete = false;
  $scope.loanId = $location.path().slice($location.path().lastIndexOf('/')+1);

  //load loan from db
  LendRequest.getLoan($scope.loanId)
  //success
  .then(function(loan){
    $scope.loan = loan;
  },
  //error 
  function(error){
    console.log('Error loading loan: '+error);
  })
  .finally(function(){
    $scope.getRequestComplete = true;
  });

  $scope.returnToDashboard = function(){
    $location.path( "/lend" );
  };

}]);