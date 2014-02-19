angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest',
function($scope, BorrowRequest){
  BorrowRequest.redirectInvalidLoan(); //send user back to /borrow if the current loan attributes are not valid for loan confirmation
  $scope.loan = BorrowRequest.getLoan();
  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;
}]);