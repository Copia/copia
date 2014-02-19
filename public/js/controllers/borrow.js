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


  //functionality for DEBT NEEDED-BY pop-out calendar
  $scope.debtNeededOpened = false;
  $scope.debtNeededMin = new Date(); //earliest debt request is today
  var max = new Date();
  $scope.debtNeededMax = max.setDate(max.getDate() + 7*4); //latest debt request is 1 months from now
  
  $scope.debtNeededBySelected = false;
  $scope.$watch('loan.date.neededBy', function(neededBy){
    //if neededBy is cleared, reset payback date
    if(neededBy === undefined) {
      $scope.debtNeededBySelected = false;
      $scope.loan.date.payback = undefined;
    } else {
      $scope.debtNeededBySelected = true;
    }
  }, true)
  
  $scope.openDebtNeeded = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.debtNeededOpened = true;
  };

  //functionality for DEBT PAYBACK drop down menu
  $scope.debtDueSelection = undefined;
  $scope.$watch('debtDueSelection', function(selection){
    console.log(selection);
  }, true);

}]);