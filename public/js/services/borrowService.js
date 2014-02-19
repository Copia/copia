'use strict';

angular.module('app')
.provider('BorrowRequest', function(){
  
  this.loan = {
    amount : {
      loan : undefined,
      payback : undefined
    },
    date : {
      neededBy : undefined
    },
    paybackDays : undefined,
    category : undefined,
    reason : undefined
  };

  this.validLoanAttrs = true; //record whether loan attrs are valid for posting to db

  this.$get = function($http, $location){
    var self = this;

    var service = {
      //update loanAttrs from borrow.js
      saveLoan : function(attrs) {
        self.loan = attrs;
      },

      getLoan : function() {
        return self.loan;
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
      },

      redirectInvalidLoan : function(){
        if(!self.validLoanAttrs) {
          $location.path( "/borrow" );
        } 
      }

    };
    return service;
  }
});