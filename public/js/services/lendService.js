'use strict';

angular.module('app')
.provider('LendRequest', function(){
  this.selectedLoan = null;

  this.$get = function($http, $location, $q){
    var self = this;

    var service = {
      getLoans : function(){
        var d = $q.defer();
        $http.get('/users/id/loans')
        .success(function(loans, status, headers, config) {
          d.resolve(loans);
        })
        .error(function(data, status, headers, config) {
          d.reject(data);
        });
        return d.promise;
      },

      setLoan : function(loan) {
        self.loan = loan;
      },

      getLoan : function() {
        return self.loan;
      }
    };
    return service;
  }
});