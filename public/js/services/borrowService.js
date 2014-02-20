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

        //format loan attributes to match up with database;
        var loan = {};
        loan.principal = self.loan.amount.loan;
        loan.payback_amount = self.loan.amount.payback;
        loan.match_deadline = self.loan.date.neededBy;
        loan.payback_days = self.loan.paybackDays;
        loan.category = self.loan.category;
        loan.purpose = self.loan.reason;
        loan.matched = false;
        //TODO: update this field with the actual organization
        loan.organization = 'Organization Placeholder';

        //TODO: need a way to access the actual user_id
        //Route to post new loans:  /users/:userId/loans
        $http.post('/users/500/loans', loan)
        .success(function(data, status, headers, config) {
          console.log('Loan posted to db: ',loan);
        })
        .error(function(data, status, headers, config) {
          console.log('Error: ', data);
        });
      }
    };
    return service;
  }
});






