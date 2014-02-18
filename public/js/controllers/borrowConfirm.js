angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest',
function($scope, BorrowRequest){
  BorrowRequest.redirectInvalidLoan();
  $scope.loan = BorrowRequest.getLoanAttrs();

  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;
}]);