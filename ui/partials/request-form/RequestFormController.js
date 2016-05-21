/* 
 * 
 */

function RequestFormController($scope, $http) {

    $scope.model = {};

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
        var invalid = $scope.isInvalidForm();
        if (invalid) {
            alert(invalid);
        } else {
            $scope.busy = true;
            $scope.calculateTotalHeadCount();
            $http({
                method: 'POST',
                url: 'http://one-one-seven.herokuapp.com/public/requests',
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
