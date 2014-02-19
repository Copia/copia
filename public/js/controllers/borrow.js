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
  $scope.debtNeededOpened = false; //status of pop-out calendar
  $scope.debtNeededMin = new Date(); //earliest debt request is today
  var max = new Date();
  $scope.debtNeededMax = max.setDate(max.getDate() + 7*4); //latest debt request is 1 months from now
  
  $scope.debtNeededBySelected = false; //
  $scope.$watch('loan.date.neededBy', function(neededBy){
    //if neededBy is cleared, reset payback date
    if(neededBy === undefined) {
      $scope.debtNeededBySelected = false;
      $scope.debtDueSelection = undefined;
    } else {
      $scope.debtNeededBySelected = true;
    }
  }, true)
  
  //pop-out on glyphicon-calendar
  $scope.openDebtNeeded = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.debtNeededOpened = true;
  };

  //map drop down list selection to number of days
  var optionsToDays = {
    'One Week' : 7,
    'Two Weeks' : 14,
    'Three Weeks' : 21,
    'One Month' : 28,
    'Two Months' : 56,
    'Three Months' : 84
  };

  //functionality for DEBT PAYBACK drop down menu
  $scope.debtDueSelection = undefined; //drop down list selection
  $scope.otherDebtDueSelected = false; //"is Other" option on drop down list selected?
  
  $scope.$watch('debtDueSelection', function(selection){
    if(selection === 'Other (Enter # of days)') {
      $scope.otherDebtDueSelected = true; //'Other' option selected, display manual input box for # of days
      $scope.loan.paybackDays = undefined; //reset # of days for payback
    } else {
      $scope.otherDebtDueSelected = false;
      $scope.loan.paybackDays = optionsToDays[selection]; 
    }
  }, true);
}]);



