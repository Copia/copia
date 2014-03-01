'use strict';

angular.module('app')
.controller('BorrowController',
["$scope", "$location", 'Sanitizer', '$rootScope',
function($scope, $location, Sanitizer, $rootScope){
  //Determine local time
  var localTime = new Date();
  localTime.setMinutes(localTime.getMinutes() - localTime.getTimezoneOffset());
  localTime = localTime.toJSON().slice(0,10);

  $rootScope.loan = {};
  $rootScope.loan.principal = null;
  $rootScope.loan.payback_amount = null;
  $rootScope.loan.date = {};
  $rootScope.loan.match_deadline = localTime;
  $rootScope.loan.payback_days = null;
  $rootScope.loan.category = null;
  $rootScope.loan.reason = null;

  //confirm borrow request choices --> moves user to confirmation
  $scope.borrowConfirm = function(){
    $rootScope.loan = Sanitizer.sanitize($rootScope.loan);
    $location.path( "/borrow_confirmation" );
  };

  //clear borrow request fields
  $scope.clearForm = function(){
    $rootScope.loan.principal = null;
    $rootScope.loan.payback_amount = null;
    $rootScope.loan.match_deadline = null;
    $rootScope.loan.payback_days = null;
    $rootScope.loan.category = null;
    $rootScope.loan.reason = null;
  };

  //cancel borrow request
  $scope.cancel = function(){
    $scope.clearForm();
    $location.path( "/dashboard" );
  };

  //monitor form for validity
  $rootScope.validLoanAttrs = false;
  $scope.$watch('loanRequestForm.$invalid', function(invalid){
    $rootScope.validLoanAttrs = !invalid;
  }, true);

  //Options for deadline dropdown
  $scope.deadlineOptions = [
    { name: 'One week', value: 7 },
    { name: 'Two weeks', value: 14 },
    { name: 'One month', value: 30 },
    { name: 'Two months', value: 60 },
    { name: 'Three months', value: 90 },
    { name: 'Six months', value: 180 },
    { name: 'One year', value: 360 }
  ];

  //Options for loan purpose dropdown
  $scope.purposeOptions = [
    { name: 'Education', value: 'education' },
    { name: 'Transportation', value: 'transportation' },
    { name: 'Entertainment', value: 'entertainment' },
    { name: 'Health', value: 'health' },
    { name: 'Other', value: 'other' }
  ];


}]);



