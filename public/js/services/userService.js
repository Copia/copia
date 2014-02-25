'use strict';

angular.module('app')
.provider('CheckUser', function(){
  this.user = null;

  this.$get = function($http, $location, $q){
    var self = this;

    var service = {
      getUser : function(user_id, session_token){
        var d = $q.defer();

        $http.get('/users/'+user_id, {params: {session_token: session_token, userId}})
        .success(function(user, status, headers, config) {
          d.resolve(user);
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