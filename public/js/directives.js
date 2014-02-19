'use strict';

app.directive('paybackValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {

      $scope.$watch(function(watched){
        var loanAmt = watched.loanAttrs.loanAmount;
        var paybackAmt = watched.loanAttrs.paybackAmount;

        if(loanAmt <= paybackAmt){
          ngModel.$setValidity('paybackThreshold', true);
        } else {
          ngModel.$setValidity('paybackThreshold', false);
        }
      });
    }
  }
});