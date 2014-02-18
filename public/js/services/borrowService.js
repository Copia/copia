'use strict';

angular.module('app')
.provider('BorrowRequest', function(){
  
  this.loanAttrs = {};

  this.$get = function($http){
    var self = this;
    
    var service = {
      saveDebtAttrs : function(attrs) {
        self.loanAttrs = attrs;
      },

      submitBorrowRequest : function() {
        console.log('Loan request submitted: ', self.loanAttrs);
        //TODO: loanAttrs needs to be formatted to match up with schema
        //TODO: need a way to access the user_id
        ///users/:userId/loans
        $http.post('/users/500/loans', self.loanAttrs)
        .success(function(data, status, headers, config) {
          
        })
        .error(function(data, status, headers, config) {
          
        });
      }

    };
    return service;
  }
});