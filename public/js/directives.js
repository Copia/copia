'use strict';

//custom validation to ensure that payback amount is >= loan amount
angular.module('app').directive('paybackValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {

      $scope.$watch('loan.amount', function(amounts){
        //TODO: make sure that user can't input 10.0000 or 10.053523

        var loanAmt = amounts.loan;
        var paybackAmt = amounts.payback;


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