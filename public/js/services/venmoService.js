'use strict';

angular.module('app')
.provider('VenmoAuthentication', function(){

  this.$get = function($http, $q){
    var self = this;

    var service = {
      authenticate : function(user_id, session_token){
        console.log('userid: ',user_id);
        console.log('session_token: ', session_token);
        var d = $q.defer();
        $http.post('/account', 
        {userId : user_id, session_token : session_token})
        .success(function(data, status, headers, config) {
          d.resolve(data);
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