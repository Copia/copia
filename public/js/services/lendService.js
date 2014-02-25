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