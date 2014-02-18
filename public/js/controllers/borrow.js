angular.module('app')
.controller('BorrowController', 
["$scope", "$location",
function($scope, $location){
  $scope.loanAmount = undefined;
  $scope.paybackAmount = undefined; 
  $scope.debtDueDate = undefined;
  $scope.debtDeadlineDate = undefined;
  $scope.debtCategory = undefined;
  $scope.debtReason = undefined;

  $scope.borrowConfirm = function(){
    $location.path( "/borrow_confirmation" );
  };
}]);