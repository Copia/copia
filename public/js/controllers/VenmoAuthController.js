angular.module('app')
.controller('VenmoAuthController',
["$scope", 'CookieService', '$http', '$location',
function($scope, CookieService, $http, $location){
  var cookies = CookieService.getCookies();
  $scope.user_id = cookies.user_id;
  $scope.venmo_code = window.location.search.slice(6);

  console.log('user_id:  ', $scope.user_id);
  console.log('venmo_code:  ', $scope.venmo_code);

  $http.post('/auth', {
    userId : $scope.user_id, 
    venmoCode: $scope.venmo_code
  })
  .success(function(data, status, headers, config) {
    console.log('User connncted to Venmo');
    $location.path( "/dashboard" );
  })
  .error(function(error, status, headers, config) {
    console.log('Error: ', error);
  });
}]);
