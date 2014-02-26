'use strict';

angular.module('app')
.provider('LendRequest', function(){
  this.selectedLoan = null;

  this.$get = function($http, $location, $q){
    var self = this;

    var service = {
      getLoans : function(session_token, user_id){
        var d = $q.defer();

        $http.get('/users/'+user_id+'/loans', {params: {session_token: session_token}})
        .success(function(loans, status, headers, config) {
          d.resolve(loans);
        })
        .error(function(data, status, headers, config) {
          d.reject(data);
        });
        return d.promise;
      },

      getLoan : function(load_id, session_token, user_id) {
        var d = $q.defer();
        
        // /users/:userId/loans/:loanId
        $http.get('/users/'+user_id+'/loans/'+load_id, {params: {session_token: session_token}})
        .success(function(loan, status, headers, config) {
          d.resolve(loan);
        })
        .error(function(data, status, headers, config) {
          d.reject(data);
        });
        return d.promise;
      },

      fundLoan : function(loan_id, session_token, user_id) {
        var d = $q.defer();
        console.log("Funding loan...");
        $http.put('/users/'+ user_id +'/loans/'+ loan_id, {session_token: session_token, lender_id: user_id})
        .success(function(loan, status, headers, config) {
          console.log(loan, status, headers, config);
          d.resolve(loan);
        })
        .error(function(data, status, headers, config) {
          d.reject(data);
        });
        return d.promise;
      }
    };
    return service;
  }
});