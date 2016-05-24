/* 
 * 
 */


function DetailsModalController($scope, $http, $uibModalInstance, $cookies, requestSelected) {
    
    $scope.requestSelected = requestSelected;

  $scope.ok = function () {
      
//      console.log($scope.requestSelected);

    var encodedCredentials = $cookies.get('encodedCredentials');

    if(encodedCredentials == "" || encodedCredentials == undefined || encodedCredentials == null){
            $state.go('login');

    }
      
    $uibModalInstance.close(status);

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}