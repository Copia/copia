'use strict';

angular.module('app')
.provider('Sanitizer', function(){
  this.$get = function($sanitize){

    var service = {
      
      sanitize: function(object){
        var sanitizedObject = {};
        for (var key in object){
          sanitizedObject[key] = $sanitize(object[key]);
        }
        return sanitizedObject;
      }

    };
    return service;
  }
});