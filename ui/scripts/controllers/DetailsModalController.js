/* 
 * 
 */


function DetailsModalController($scope, $http, $uibModalInstance, $cookies, requestSelected) {
    
  $scope.requestSelected = requestSelected;
  $scope.comments = [];
  

  $scope.loadComments = function(){

    var encodedCredentials = $cookies.get('encodedCredentials');

    if(encodedCredentials == "" || encodedCredentials == undefined || encodedCredentials == null){
      $state.go('login');
    }

    $http({
            method: 'GET',
            url: 'http://117.dmc.gov.lk/one-one-seven/public/requests/' + $scope.requestSelected.req_ID + '/status',
            headers: {
              'X-Authorization': 'Basic '+ encodedCredentials
            },
            params: $scope.filters
    }).then(function successCallback(response) {
            $scope.comments = response.data;
            console.log(response);
    }, function errorCallback(response) {
            console.error(response);
    });
  }

  $scope.loadComments();

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