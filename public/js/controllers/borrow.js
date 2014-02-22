angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'BorrowRequest', 'Sanitizer',
function($scope, $location, BorrowRequest, Sanitizer){
  //load loan attrs from persistent loan service
  $scope.loan = BorrowRequest.getLoan();

  $scope.borrowConfirm = function(){ //this function can only be called when form is valid
    console.log($scope.loan);
    $scope.loan = Sanitizer.sanitize($scope.loan);
    BorrowRequest.saveLoan($scope.loan);
    $location.path( "/borrow_confirmation" );
  };

  $scope.clearForm= function(){
    BorrowRequest.clearLoan();
    $scope.loan = BorrowRequest.getLoan();
  };

  $scope.cancel = function(){
    $scope.clearForm();
    $location.path( "/dashboard" );
  };

  //Will use for future refactor
  $scope.deadlineOptions = [
    { name: 'One week', value: 7 },
    { name: 'Two weeks', value: 14 },
    { name: 'One month', value: 30 },
    { name: 'Two months', value: 60 },
    { name: 'Three months', value: 90 },
    { name: 'Six months', value: 180 },
    { name: 'One year', value: 360 }
  ];

  //Will use for future refactor
  $scope.purposeOptions = [
    { name: 'Education', value: 'education' },
    { name: 'Transportation', value: 'transportation' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Health', value: 'health' },
    { name: 'Other', value: 'other' }
  ];

  /*$scope.roundDebtAmt = function(){
    if(!isNaN($scope.loan.amount.loan)){
      $scope.loan.amount.loan = Number($scope.loan.amount.loan.toFixed(2));
    }
  };

  $scope.roundPaybackAmt = function(){
    if(!isNaN($scope.loan.amount.payback)){
      $scope.loan.amount.payback = Number($scope.loan.amount.payback.toFixed(2));
    }
  };*/

  //monitor form for validity; alert BorrowRequest service to allow /borrow_confirmation route
  $scope.$watch('loanRequestForm.$invalid', function(invalid){
    BorrowRequest.validateLoan(!invalid);
  }, true);

  //functionality for DEBT NEEDED-BY pop-out calendar
  //$scope.debtNeededOpened = false; //status of pop-out calendar
  //$scope.debtNeededMin = new Date(); //earliest debt request is today
  //var max = new Date();
  //$scope.debtNeededMax = max.setDate(max.getDate() + 7*4); //latest debt request is 1 months from now

  //$scope.debtNeededBySelected = false; //
  /*$scope.$watch('loan.date.neededBy', function(neededBy){
    //if neededBy is cleared, reset payback date
    if(neededBy === null) {
      $scope.debtNeededBySelected = false;
      $scope.debtDueSelection = null;
    } else {
      $scope.debtNeededBySelected = true;
    }
  }, true)*/

  //pop-out on glyphicon-calendar
  /*$scope.openDebtNeeded = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.debtNeededOpened = true;
  };*/

  //map drop down list selection to number of days
  /*var optionsToDays = {
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
  }*/

  //functionality for DEBT PAYBACK drop down menu
  /*if($scope.loan.paybackDays === null) {
    $scope.debtDueSelection = null; //drop down list selection
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
  }, true);*/
}]);



