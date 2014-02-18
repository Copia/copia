angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  
  //load loan attrs from persistent loan service
  var loan = BorrowRequest.getLoanAttrs();
  $scope.loanAttrs = {
    loanAmount : loan.loanAmount,
    paybackAmount : loan.paybackAmount, 
    debtDueDate : loan.debtDueDate,
    debtDeadlineDate : loan.debtDeadlineDate,
    debtCategory : loan.debtCategory,
    debtReason : loan.debtReason
  }

  $scope.borrowConfirm = function(){
    var debtAttrs = {
      loanAmount : $scope.loanAttrs.loanAmount,
      paybackAmount : $scope.loanAttrs.paybackAmount,
      debtDueDate : $scope.loanAttrs.debtDueDate,
      debtDeadlineDate : $scope.loanAttrs.debtDeadlineDate,
      debtCategory : $scope.loanAttrs.debtCategory,
      debtReason : $scope.loanAttrs.debtReason
    }
    BorrowRequest.saveLoanAttrs(debtAttrs);
    $location.path( "/borrow_confirmation" );
  };
}]);