'use strict';

angular.module('app')
.provider('LendRequest', function(){

  this.$get = function($http, $location){
    var self = this;

    var service = {
      getLoans : function(){
        $http.get('/users/id/loans')
        .success(function(data, status, headers, config) {
          console.log(data);
          return data;
        })
        .error(function(data, status, headers, config) {
          console.log('Error requesting loans');
        });
      }
    };
    return service;
  }
});