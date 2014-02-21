'use strict';

angular.module('app')
.factory('Sanitizer', function($sanitize){

    var service = {
      
      sanitize: function(object){
        var sanitizedObject = {};
        for (var key in object){
          if (!Array.isArray(object[key]) && (typeof(object[key]) === 'object')){
            sanitizedObject[key] = this.sanitize(object);
          } else if (typeof(object[key]) !== 'string') {
            sanitizedObject[key] = object[key];
          } else {
            sanitizedObject[key] = $sanitize(object[key]);
          }
        }
        return sanitizedObject;
      }

    };
    return service;
});