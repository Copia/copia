angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  
  //load loan attrs from persistent loan service
  var loan = BorrowRequest.getLoanAttrs();
  $scope.loanAmount = loan.loanAmount;
  $scope.paybackAmount = loan.paybackAmount; 
  $scope.debtDueDate = loan.debtDueDate;
  $scope.debtDeadlineDate = loan.debtDeadlineDate;
  $scope.debtCategory = loan.debtCategory;
  $scope.debtReason = loan.debtReason;

  $scope.borrowConfirm = function(){
    var debtAttrs = {
      loanAmount : $scope.loanAmount,
      paybackAmount : $scope.paybackAmount,
      debtDueDate : $scope.debtDueDate,
      debtDeadlineDate : $scope.debtDeadlineDate,
      debtCategory : $scope.debtCategory,
      debtReason : $scope.debtReason
    }
    BorrowRequest.saveLoanAttrs(debtAttrs);
    $location.path( "/borrow_confirmation" );
  };
}]);