angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  $scope.loanAmount = undefined;
  $scope.paybackAmount = undefined; 
  $scope.debtDueDate = undefined;
  $scope.debtDeadlineDate = undefined;
  $scope.debtCategory = undefined;
  $scope.debtReason = undefined;

  $scope.borrowConfirm = function(){
    var debtAttrs = {
      loanAmount : $scope.loanAmount,
      paybackAmount : $scope.paybackAmount,
      debtDueDate : $scope.debtDueDate,
      debtDeadlineDate : $scope.debtDeadlineDate,
      debtCategory : $scope.debtCategory,
      debtReason : $scope.debtReason
    }
    BorrowRequest.saveDebtAttrs(debtAttrs);
    $location.path( "/borrow_confirmation" );
  };
}]);