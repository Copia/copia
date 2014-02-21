'use strict';

angular.module('app')
.factory('Sanitizer', function($sanitize){

    var service = {
      
      sanitize: function(object){
        var sanitizedObject = {};
        for (var key in object){
          if (!Array.isArray(object[key]) && (typeof(object[key]) === 'object') && (object[key].getDate === undefined)){
            sanitizedObject[key] = this.sanitize(object[key]);
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