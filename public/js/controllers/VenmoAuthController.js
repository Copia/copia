angular.module('app')
.controller('VenmoAuthController',
["$scope", 'CookieService', '$http',
function($scope, CookieService, $http){
  var cookies = CookieService.getCookies();
  $scope.user_id = cookies.user_id;
  $scope.venmo_code = window.location.search.slice(6);

  console.log('user_id:  ', $scope.user_id);
  console.log('venmo_code:  ', $scope.venmo_code);

  $http.post('/connectWithVenmo', 
  {user_id : $scope.user_id, venmo_code: $scope.venmo_code})
  .success(function(data, status, headers, config) {
    console.log('User connncted to Venmo: ', data);
    $location.path( "/dashboard" );
  })
  .error(function(error, status, headers, config) {
    console.log('Error: ', error);
  });
}]);