'use strict';

angular.module('app')
.provider('Sanitizer', function(){
  this.$get = function($sanitize){

    var service = {
      
      sanitize: function(credentials){
        return {
          email: $sanitize(credentials.email),
          password: $sanitize(credentials.password)
        };
      }

    };
    return service;
  }
});