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
        .success(function(userObj, status, headers, config) {
          if (userObj.user.user){
            console.log('user:', userObj);
            $rootScope.showDashboard = true;
          } else {
            $rootScope.venmoConnected = false;
          }
          d.resolve(userObj);
        })
        .error(function(data, status, headers, config) {
          //redirect to splash page
          $location.path( "/" );
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
  };
});