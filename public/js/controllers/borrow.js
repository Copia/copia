angular.module('app')
.controller('BorrowController', ["$scope", function($scope){
  $scope.loanAmount = undefined;
  $scope.paybackAmount = undefined; 
  $scope.debtDueDate = undefined;
  $scope.debtDeadlineDate = undefined;
  $scope.debtCategory = undefined;
  $scope.debtReason = undefined;
}]);