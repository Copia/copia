'use strict';

angular.module('app')
.provider('CookieService', function(){

  this.$get = function($cookieStore){
    
    var service = {
      storeCookies : function(user) {
        $cookieStore.put('session_token', user.session_token);
        $cookieStore.put('user_id', user._id);
      },
      getCookies : function(){
        return {
          'session_token' : $cookieStore.get('session_token'),
          'user_id' : $cookieStore.get('user_id')
        };
      },
      eatCookies : function(){
        $cookieStore.remove('session_token');
        $cookieStore.remove('user_id');
      }
    };
    return service;
  };
});