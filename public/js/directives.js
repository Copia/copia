'use strict';

app.directive('paybackValidation', function(){
  return {
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModel) {

      $scope.$watch('loan.amount', function(amount){
        var loanAmt = amount.loan;
        var paybackAmt = amount.payback;


        if(loanAmt !== undefined && loanAmt <= paybackAmt){
          ngModel.$setValidity('paybackThreshold', true);
        } else {
          ngModel.$setValidity('paybackThreshold', false);
        }
      }, true);
    }
  }
});

// app.directive('repaymentDateValidation', function(){
//   return {
//     require: 'ngModel',
//     link : function($scope, elm, attrs, ngModel) {
//       $scope.$watch('loanAttrs.debtDueDate', function(newVal, oldVal){
//         // var repayDate = watched.loanAttrs.debtDueDate;
//         // repayDate = new Date(watched.loanAttrs.debtDueDate);
//         console.log(newVal);
//       });
//     }
//   }
// });