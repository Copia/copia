angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  
  //load loan attrs from persistent loan service
  $scope.loan = BorrowRequest.getLoan();

  $scope.borrowConfirm = function(){
    BorrowRequest.saveLoan($scope.loan);
    $location.path( "/borrow_confirmation" );
  };

  $scope.debtDueOpened = false;
  var min = new Date();
  $scope.debtDueMin = min.setDate(min.getDate() + 7); //earliest payback is one week from today
  $scope.debtDueMax = min.setDate(min.getDate() + 365); //latest payback is one year from one week away
  
  $scope.openDebtDue = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.debtDueOpened = true;
  };
}]);