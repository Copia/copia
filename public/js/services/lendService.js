'use strict';

angular.module('app')
.provider('LendRequest', function(){
  this.selectedLoan = null;

  this.$get = function($http, $location, $q){
    var self = this;

    var service = {
      getLoans : function(token){
        var d = $q.defer();

        // {'session_token' : token}
        //TODO: use actual user id
        $http.get('/users/530bd2749debf900002038f1/loans?session_token='+token)
        .success(function(loans, status, headers, config) {
          d.resolve(loans);
        })
        .error(function(data, status, headers, config) {
          d.reject(data);
        });
        return d.promise;
      },

      getLoan : function(id) {
        var d = $q.defer();
        //TODO: use actual user id
        $http.get('/users/tempUserId/loans/'+id)
        .success(function(loan, status, headers, config) {
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