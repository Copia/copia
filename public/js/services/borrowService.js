'use strict';

angular.module('app')
.provider('BorrowRequest', function(){
  
  this.loan = {
    amount : {
      loan : null,
      payback : null
    },
    date : {
      neededBy : null
    },
    paybackDays : null,
    category : null,
    reason : null
  };

  this.validLoanAttrs = false; //record whether loan attrs are valid for posting to db

  this.$get = function($http, $location){
    var self = this;

    var service = {
      clearLoan : function(){
        self.loan.amount.loan = null;
        self.loan.amount.payback = null;
        self.loan.date.neededBy = null;
        self.loan.paybackDays = null;
        self.loan.category = null;
        self.loan.reason = null;
      },

      //update loanAttrs status from borrow.js
      validateLoan : function(status) {
        self.validLoanAttrs = status;
      },

      //update loanAttrs from borrow.js
      saveLoan : function(attrs) {
        self.loan = attrs;
      },

      getLoan : function() {
        return self.loan;
      },

      redirectInvalidLoan : function(){
        if(!self.validLoanAttrs) {
          $location.path( "/borrow" );
        } 
      },

      submitBorrowRequest : function() {
        console.log('Loan request submitted: ', self.loan);
        //TODO: self.loan needs to be editted to match up with schema
        //TODO: need a way to access the user_id
        ///users/:userId/loans
        $http.post('/users/500/loans', self.loan)
        .success(function(data, status, headers, config) {
          console.log(self.loan);
        })
        .error(function(data, status, headers, config) {
          
        });
      }
    };
    return service;
  }
});