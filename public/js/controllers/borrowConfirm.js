angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest', '$location',
function($scope, BorrowRequest, $location){
  BorrowRequest.redirectInvalidLoan(); //send user back to /borrow if the current loan attributes are not valid for loan confirmation
  $scope.loan = BorrowRequest.getLoan();
  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;

  $scope.cancel = function(){
    BorrowRequest.clearLoan();
    $location.path( "/dashboard" );
  };
}]);