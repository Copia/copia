'use strict';

angular.module('app')
.provider('BorrowRequest', function() {
  // returns today's date in proper <input type="date" /> format
  var today = function() {
    var local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  };

  this.loan = {
    amount: {
      loan: null,
      payback: null
    },
    date: {neededBy: today()},
    paybackDays: null,
    category: null,
    reason: null
  };

  this.validLoanAttrs = false; //record whether loan attrs are valid for posting to db

  this.$get = function($http, $location) {
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

      // update loanAttrs status from borrow.js
      validateLoan : function(status) {
        self.validLoanAttrs = status;
      },

      // update loanAttrs from borrow.js
      saveLoan : function(attrs) {
        self.loan = attrs;
      },

      getLoan : function() {
        return self.loan;
      },

      redirectInvalidLoan : function() {
        if(!self.validLoanAttrs) {
          $location.path( "/borrow" );
        }
      },

      submitBorrowRequest : function(session_token, user_id) {
        console.log('Loan request submitted: ', self.loan);

        // format loan attributes to match up with database;
        var loan = {};
        loan.principal = self.loan.amount.loan;
        loan.payback_amount = self.loan.amount.payback;
        loan.match_deadline = self.loan.date.neededBy;
        loan.payback_days = self.loan.paybackDays;
        loan.category = self.loan.category;
        loan.purpose = self.loan.reason;
        loan.matched = false;
        // TODO: update this field with the actual organization
        loan.organization = 'Organization Placeholder';

        // Route to post new loans:  /users/:userId/loans
        $http.post('/users/'+user_id+'/loans', {session_token : session_token, loan : loan})
        .success(function(data, status, headers, config) {
          console.log('Loan posted to db: ',loan);
          $location.path( "/dashboard" );
        })
        .error(function(data, status, headers, config) {
          console.log('Error: ', data);
          $location.path( "/dashboard" );
        });
      }
    };
    return service;
  };
});

