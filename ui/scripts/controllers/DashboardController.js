/* 
 * 
 */


function DashboardController($scope, $http) {

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
        {"request_type": "Evacuation","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
         {"request_type": "Locate Missing Person","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Medical","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Bedding Items","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Clothes","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Food Items","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Non-Food Items","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "School Items","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Search & Rescue Items","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Shelter","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Water & Sanitation","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2},
            {"request_type": "Repair to Damages","total_open": 270, "opened_today": 260, "closed_today": 240, "people_supported":100, "avg_res": "1 hour", "current_res": "1 hour", "closed_per": "50%", "closed_days":2}
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