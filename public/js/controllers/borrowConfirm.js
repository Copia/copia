angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest',
function($scope, BorrowRequest){
  BorrowRequest.redirectInvalidLoan();

  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;
}]);