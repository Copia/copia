angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest', '$location', 'CookieService',
function($scope, BorrowRequest, $location, CookieService){
  BorrowRequest.redirectInvalidLoan(); //send user back to /borrow if the current loan attributes are not valid for loan confirmation
  $scope.loan = BorrowRequest.getLoan();
  
  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  $scope.submitBorrowRequest = function(){
    BorrowRequest.submitBorrowRequest($scope.session_token, $scope.user_id);
  };

  $scope.cancel = function(){
    BorrowRequest.clearLoan();
    $location.path( "/dashboard" );
  };
}]);