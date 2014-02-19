angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest',
function($scope, $location, BorrowRequest){
  
  //load loan attrs from persistent loan service
  $scope.loan = BorrowRequest.getLoan();

  $scope.borrowConfirm = function(){ //this function can only be called when form is valid
    BorrowRequest.saveLoan($scope.loan);
    $location.path( "/borrow_confirmation" );
  };

  $scope.cancel = function(){
    $location.path( "/dashboard" );
  };

  //monitor form for validity; alert BorrowRequest service to allow /borrow_confirmation route
  $scope.$watch('loanRequestForm.$invalid', function(invalid){
    BorrowRequest.validateLoan(!invalid);
  }, true);

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

  var daysToOptions = {
    7 : 'One Week',
    14 : 'Two Weeks',
    21 : 'Three Weeks',
    28 : 'One Month',
    56 : 'Two Months',
    84 : 'Three Months'
  }

  //functionality for DEBT PAYBACK drop down menu
  if($scope.loan.paybackDays === undefined) {
    $scope.debtDueSelection = undefined; //drop down list selection
    $scope.otherDebtDueSelected = false; //"is Other" option on drop down list selected?
  } else if($scope.loan.paybackDays in daysToOptions) {
    $scope.debtDueSelection = daysToOptions[$scope.loan.paybackDays];
  } else {
    $scope.debtDueSelection = 'Other (Enter # of days)';
  }

  $scope.$watch('debtDueSelection', function(selection){
    if(selection === 'Other (Enter # of days)') {
      $scope.otherDebtDueSelected = true; //'Other' option selected, display manual input box for # of days
    } else {
      $scope.otherDebtDueSelected = false;
      $scope.loan.paybackDays = optionsToDays[selection]; 
    }
  }, true);
}]);



