'use strict';

angular.module('app')
.provider('LendRequest', function(){

  this.$get = function($http, $location){
    var self = this;

    var service = {
      test : function(){
        console.log('test');
      }
    };
    return service;
  }
});