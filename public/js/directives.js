'use strict';

//custom validation to ensure that payback amount is >= loan amount
angular.module('app').directive('paybackValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {

      $scope.$watch('loan', function(loan){
        var loanAmt = loan.principal;
        var paybackAmt = loan.payback_amount;
        if(loanAmt !== null && loanAmt <= paybackAmt){
          ngModel.$setValidity('paybackThreshold', true);
        } else {
          ngModel.$setValidity('paybackThreshold', false);
        }
      }, true);
    }
  };
});

//custom element to display loan snippets
angular.module('app').directive('loanSnippet', function(){
  return {
    require: 'ngModel',
    restrict: 'A',
    templateUrl: '/views/loanSnippet.html'
  };
});