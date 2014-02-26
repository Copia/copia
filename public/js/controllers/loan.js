angular.module('app')
.controller('LoanController', 
["$scope", '$location', 'LendRequest', 'CookieService', '$modal',
function($scope, $location, LendRequest, CookieService, $modal){
  $scope.loan = null;
  $scope.getRequestComplete = false;
  $scope.loan_id = $location.path().slice($location.path().lastIndexOf('/')+1);

  var cookies = CookieService.getCookies();
  $scope.session_token = cookies.session_token;
  $scope.user_id = cookies.user_id;

  //load loan from db
  LendRequest.getLoan($scope.loan_id, $scope.session_token, $scope.user_id)
  //success
  .then(function(loan){
    $scope.loan = loan;
  },
  //error 
  function(error){
    console.log('Error loading loan: '+error);
  })
  .finally(function(){
    $scope.getRequestComplete = true;
  });

  $scope.returnToDashboard = function(){
    $location.path( "/lend" );
  };

  //put('/users/:userId/loans/:loanId'

  //POP OUT CONFIRMATION
  $scope.openConfirmation = function() {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'LoanController'
    });

    modalInstance.result.then(function (selectedItem) {
      // $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });

    
  };

}]);