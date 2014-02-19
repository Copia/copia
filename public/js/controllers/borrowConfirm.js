angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest',
function($scope, BorrowRequest){
  BorrowRequest.redirectInvalidLoan();
  $scope.loan = BorrowRequest.getLoan();

  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;
}]);