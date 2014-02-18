angular.module('app')
.controller('BorrowConfirmController', 
["$scope", 'BorrowRequest',
function($scope, BorrowRequest){
  $scope.submitBorrowRequest = BorrowRequest.submitBorrowRequest;
}]);