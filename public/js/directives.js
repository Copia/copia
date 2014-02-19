'use strict';

app.directive('paybackValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {

      $scope.$watch('loan.amount', function(amounts){
        //TODO: make sure that user can't input 10.0000 or 10.053523

        var loanAmt = amounts.loan;
        var paybackAmt = amounts.payback;


        if(loanAmt !== undefined && loanAmt <= paybackAmt){
          ngModel.$setValidity('paybackThreshold', true);
        } else {
          ngModel.$setValidity('paybackThreshold', false);
        }
      }, true);
    }
  }
});

app.directive('repaymentDateValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {
      
      $scope.$watch('loan.date', function(dates){
        var payback = dates.payback;
        var neededBy = dates.neededBy;

        console.log(payback);
        console.log(typeof(payback));
        
      }, true);
    }
  }
});