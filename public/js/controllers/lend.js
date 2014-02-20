angular.module('app')
.controller('LendController', 
["$scope", 'LendRequest',
function($scope, LendRequest){

  $scope.loans = LendRequest.getLoans();

}]);