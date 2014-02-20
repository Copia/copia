angular.module('app')
.controller('LendController', 
["$scope", 'LendRequest',
function($scope, LendRequest){

  LendRequest.test();

}]);