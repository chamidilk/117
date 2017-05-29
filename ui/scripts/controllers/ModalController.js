/* 
 * 
 */


function ModalController($scope, $http, $uibModalInstance, $cookies, currentStatus, req_ID, apiHost) {
  $scope.statuses = ["OPEN", "PARTIAL" , "CLOSED" , "ALLOCATED" , "DUPLICATE" , "REJECTED"];

  $scope.selectedStatus = currentStatus.toUpperCase();

  $scope.ok = function () {

    var encodedCredentials = $cookies.get('encodedCredentials');

    /*console.log('ec' + encodedCredentials);
    console.log('current status' + currentStatus);*/

    if(encodedCredentials == "" || encodedCredentials == undefined || encodedCredentials == null){
            $state.go('login');

    }

    if($scope.selectedStatus == undefined){
        return;
    }

    if($scope.comment == "" || $scope.comment == null){
        return;
    }

    var request = {
        "req_ID": req_ID,
        "req_status_comment": $scope.comment,
        "reqstatus_REF": $scope.selectedStatus
    }

    //console.log(request);
    $http({
            method: 'POST',
            url: apiHost + '/requests/status',
            headers: {
              'X-Authorization': 'Basic '+ encodedCredentials
            },
            data: request
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.error(response);
        });

    $uibModalInstance.close(status);

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}