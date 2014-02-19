angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  
  //load loan attrs from persistent loan service
  $scope.loan = BorrowRequest.getLoan();

  $scope.borrowConfirm = function(){
    // var debtAttrs = {
    //   loanAmount : $scope.loanAttrs.loanAmount,
    //   paybackAmount : $scope.loanAttrs.paybackAmount,
    //   debtDueDate : $scope.loanAttrs.debtDueDate,
    //   debtDeadlineDate : $scope.loanAttrs.debtDeadlineDate,
    //   debtCategory : $scope.loanAttrs.debtCategory,
    //   debtReason : $scope.loanAttrs.debtReason
    // }

    BorrowRequest.saveLoan($scope.loan);
    $location.path( "/borrow_confirmation" );
  };
}]);