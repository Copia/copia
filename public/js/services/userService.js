'use strict';

angular.module('app')
.provider('ModifyUser', function(){
  this.user = null;

  this.$get = function($http, $location, $q, $rootScope){
    var self = this;

    var service = {
      getUser : function(cookie){
        var d = $q.defer();

        $http.get('/users/'+cookie.user_id, {params: {session_token: cookie.session_token, userId: cookie.user_id}})
        .success(function(user, status, headers, config) {
          if (user.user){
            $rootScope.venmoConnected = false;
          } else {
            $rootScope.venmoConnected = true;
          }
          d.resolve(user);
        })
        .error(function(data, status, headers, config) {
          //redirect to splash page
          $location.path( "/l" );
          d.reject(data);
        });
        return d.promise;
      },
      logoutUser : function(cookie){
        var d = $q.defer();

        $http.post('/logout', {session_token: cookie.session_token, userId: cookie.user_id})
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