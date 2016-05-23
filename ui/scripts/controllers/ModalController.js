/* 
 * 
 */


function ModalController($scope, $http, $uibModalInstance, currentStatus, req_ID) {
  $scope.statuses = ["Open", "Partial", "Closed", "Deferred", "Duplicate", "Rejected"];



  $scope.ok = function () {

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
    console.log(request);
    $http({
            method: 'POST',
            url: 'http://220.247.222.29/one-one-seven/public/requests/status',
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