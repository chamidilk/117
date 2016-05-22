/* 
 * 
 */

function DashboardController($scope, $rootScope,$http, $state, $cookies) {

    $scope.requests = [];
    $scope.offset = 1;
    $scope.limit = 20;

    $scope.filters = {
        reqstatus_REF: 'OPEN'
    };

    $scope.townSelectorOptions = {
        country: 'lk',
        types: '(cities)'
    };

    $scope.init = function () {

        var encodedCredentials = $cookies.get('encodedCredentials');

        //console.log('cookies' + $cookies.get('encodedCredentials'))
        /*if($rootScope.encodedCredentials == "" || $rootScope.encodedCredentials == undefined || $rootScope.encodedCredentials == null){
            $state.go('login');

        }*/

        if(encodedCredentials == "" || encodedCredentials == undefined || encodedCredentials == null){
            $state.go('login');

        }

        $scope.loadRequests();
    };

    $scope.loadNextPage = function () {
//        alert(1);
    };

    $scope.loadRequests = function () {
        $scope.loading = true;
        $scope.requests = [];


//        $scope.filters.limit = $scope.limit;
//        $scope.filters.offset = $scope.offset;

        var clone = angular.copy($scope.filters);

        angular.forEach(clone, function (value, key) {
            if (!value || !value.trim()) {
                delete $scope.filters[key];
            }
        });/*

                                    <td>{{request.request_type}}</td>
                            <td>{{request.opened_today}}</td>
                            <td>{{request.closed_today}}</td>
                            <td>{{request.rejected today}}</td>     
                            <td>{{request.total_opened}}</td>
                            <td>{{request.total_closed}}</td>
                            <td>{{request.total_rejected}}</td>   */

        $scope.requests=[
        {"request_type": "Evacuation","opened_today": 270, "closed_today": 260, "rejected_today": 240, "total_opened": 240, "total_closed": 240, "total_rejected": 34324 },
         {"request_type": "Shelter","opened_today": 270, "closed_today": 260, "rejected_today": 240, "total_opened": 240, "total_closed": 240, "total_rejected": 34324 }
        ]

/*        $http({
            method: 'GET',
            url: 'http://one-one-seven.herokuapp.com/public/requests',
            params: $scope.filters
        }).then(function successCallback(response) {
            $scope.loading = false;
            $scope.requests = response.data; // @TODO handle pagination
            $scope.offset += $scope.requests.length;
            console.log(response);
        }, function errorCallback(response) {
            $scope.loading = false;
            console.error(response);
        });*/
    };

    $scope.init();

}
