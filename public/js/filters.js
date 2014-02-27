'use strict';

angular.module('app')
.filter('loanStatusFilter', function() {
  return function(loans) {
    console.log(loans);
    var filtered = [];
    angular.forEach(loans, function(loan){
      if(loan.status === 'pending') {
        filtered.push(loan);
      }
    })
    return filtered;
  };
});