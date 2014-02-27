angular.module('app')
.controller('LoanController', 
["$scope", '$location', 'LendRequest', 'CookieService', '$modal', '$rootScope',
function($scope, $location, LendRequest, CookieService, $modal, $rootScope){
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

  $scope.confirmFunding = function(){
    $scope.modalInstance.close();
    LendRequest.fundLoan($scope.loan_id, $scope.session_token, $scope.user_id)
    .then(function(result) {
      console.log("Loan posted to database:\n",result);
    });
  };

  $scope.cancelModal = function(){
    $scope.modalInstance.dismiss();
  };

  //POP OUT CONFIRMATION
  $scope.openConfirmation = function() {

    $scope.modalInstance = $modal.open({
      templateUrl: 'modalConfirmation.html',
      scope: $scope
    });

    $scope.modalInstance.result.then(function (selectedItem) {
      console.log('Confirmed from modal');
    }, function () {
      console.log('Cancel from modal');
    });
  };




}]);