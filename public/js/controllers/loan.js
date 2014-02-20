angular.module('app')
.controller('LoanController', 
["$scope", 'LendRequest',
function($scope, LendRequest){
  $scope.loan = LendRequest.getLoan();
}]);