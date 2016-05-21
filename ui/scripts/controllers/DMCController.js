/* 
 * 
 */


function DMCController($scope, $http) {

    $scope.requests = [];
    $scope.offset = 1;
    $scope.limit = 20;

    $scope.filters = {
        reqstatus_REF: 'OPEN'
    };

    $scope.init = function () {
        $scope.loadRequests();
    };

    $scope.loadNextPage = function () {
//        alert(1);
    };

    $scope.loadRequests = function () {
        $scope.loading = true;
        $scope.requests = [];
        $scope.filters.limit = $scope.limit;
        $scope.filters.offset = $scope.offset;

        $http({
            method: 'GET',
            url: 'http://one-one-seven.herokuapp.com/public/requests',
            data: $scope.filters
        }).then(function successCallback(response) {
            $scope.loading = false;
            $scope.requests = response.data; // @TODO handle pagination
            $scope.offset += $scope.requests.length;
            console.log(response);
        }, function errorCallback(response) {
            $scope.loading = false;
            console.error(response);
        });
    };

    $scope.init();

}