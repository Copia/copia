'use strict';

angular.module('app')
.provider('BorrowRequest', function(){
  
  this.loanAttrs = {};

  this.$get = function(){
    var self = this;
    
    var service = {
      saveDebtAttrs : function(attrs) {
        self.loanAttrs = attrs;
        console.log(attrs);
      }
    };
    return service;
  }
});