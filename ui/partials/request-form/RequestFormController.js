/* 
 * 
 */

function RequestFormController($scope, $http) {


    $scope.model = {};

    $scope.selection = {
    };

    $scope.categories = [
        {"name" : "Evacuation", "id": "1"},
        {"name" : "Locate Missing Person", "id": "2"},
        {"name" : "Medical", "id": "3"},
        {"name" : "Bedding Items", "id": "4"},
        {"name" : "Clothes", "id": "5"},
        {"name" : "Food Items", "id": "6"},
        {"name" : "Non-food Items", "id": "7"},
        {"name" : "School Items", "id": "8"},
        {"name" : "Search & Rescue Items", "id": "9"},
        {"name" : "Shelter", "id": "10"},
        {"name" : "Water & Sanitation", "id": "11"},
        {"name" : "Repair to Damages", "id": "12"}];


    var mandatoryFields = {
        'per_fullname': 'Full Name',
        'nationalID': 'National Identity Card Number',
        'per_mobile': 'Mobile Number',
        'req_address': 'Address of the Incident',
        'req_area': 'City Name',
        'req_type_REF': 'Request Type'
    };

    $scope.townSelectorOptions = {
        country: 'lk',
        types: '(cities)'
    };

    $scope.calculateTotalHeadCount = function () {
        if ($scope.model.adultHeadCount || $scope.model.kidsHeadCount || $scope.model.infantHeadCount) {
            $scope.model.totalHeadCount = ($scope.model.adultHeadCount || 0) + ($scope.model.kidsHeadCount || 0) + ($scope.model.infantHeadCount || 0);
        }
    };

    $scope.isInvalidForm = function () {
        var msg = "Please provide following information.\n";

        var invalid = false;

        //change here
        $scope.model.req_type_REF = "check123"


        angular.forEach(mandatoryFields, function (fieldName, key) {
            var value = $scope.model[key];
            if (!value || !value.trim()) {
                msg += ' - ' + fieldName + '\n';
                invalid = true;
            }
        });

        if (invalid) {
            return msg;
        } else {
            return false;
        }

    };

    $scope.submitRequest = function () {
        console.log($scope.selection);
        var invalid = $scope.isInvalidForm();
        if (invalid) {
            alert(invalid);
        } else {
            $scope.busy = true;
            $scope.calculateTotalHeadCount();
            console.log($scope.model)
            $http({
                method: 'POST',
                url: 'http://220.247.222.29/one-one-seven/public/requests',
                data: $scope.model
            }).then(function successCallback(response) {
                $scope.busy = false;
                $scope.model = {};
                alert('Your request has been successfully submitted. We will contact you shortly. Thank you.');
                console.log(response);
            }, function errorCallback(response) {
                $scope.busy = false;
                console.error(response);
            });
        }
    };

    $scope.init = function () {

    };

    $scope.init();

}
