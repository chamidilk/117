/* 
 * 
 */

function RequestFormController($scope, $http) {


    $scope.model = {};

    $scope.selection = {
    };

    $scope.categories = [
        {"name" : "Evacuation | ඉවත් කිරීම්", "id": "1", "value" : "EVAC"},
        {"name" : "Locate Missing Person | අතුරුදහන් වුවන් සෙවීම", "id": "2", "value" : "MISSING"},
        {"name" : "Medical | වෛද්‍යාදාර", "id": "3", "value" : "MEDICAL"},
        {"name" : "Bedding Items | නිදන ද්‍රව්‍ය", "id": "4", "value" : "BEDDING"},
        {"name" : "Clothes | ඇඳුම්", "id": "5", "value" : "CLOTHES"},
        {"name" : "Food Items| ආහාර", "id": "6", "value" : "FOOD"},
        {"name" : "Non-food Items | ආහාර නොවන ද්‍රව්‍ය", "id": "7", "value" : "NONFOOD"},
        {"name" : "School Items | පාසල් උපකරණ", "id": "8", "value" : "SCHOOL"},
        {"name" : "Search & Rescue Items | සෙව්ම් හා මුදවාගැනිම්", "id": "9", "value" : "SEARCH"},
        {"name" : "Shelter | තාවකාලින නිවාස", "id": "10", "value" : "SHELTER"},
        {"name" : "Water | ජලය", "id": "11", "value" : "WATER"},
        {"name" : "Sanitation | සනීපාරක්ෂාව", "id": "12", "value" : "SANITATION"},
        {"name" : "Repair to Damages | ප්‍රතිසංස්කරණය", "id": "13", "value" : "DAMAGE"},
        {"name" : "Other | වෙනත්", "id": "14", "value" : "OTHER"}];
    
    
    $scope.disasterCategories = [
        {"name" : "Landslide | නාය යාම", "id": "21", "value" : "LANDSLIDE"},
        {"name" : "Flood | ගංවතුර", "id": "22", "value" : "FLOOD"},
        {"name" : "Cyclone | සුළි සුළඟ", "id": "1", "value" : "CYCLONE"},
        {"name" : "Drought | නියඟය", "id": "2", "value" : "DROUGHT"},
        {"name" : "Industrial Hazard | කාර්මික උපද්‍රව", "id": "3", "value" : "INDUSTRIAL_HAZARD"},
        {"name" : "Tsunami | සුනාමිය", "id": "4", "value" : "TSUNAMI"},
        {"name" : "Earthquake | භුමි කම්පාව", "id": "5", "value" : "EARTHQUAKE"},
        {"name" : "Air Hazard | ගුවන් උපද්‍රව", "id": "6", "value" : "AIR_HAZARD"},
        {"name" : "Maritime Hazard | සමුද්‍රීය උපද්‍රව", "id": "7", "value" : "MARITIME_HAZARD"},
        {"name" : "Fire | ගිනි", "id": "8", "value" : "FIRE"},
        {"name" : "Epidemic | වසංගත", "id": "9", "value" : "EPIDEMIC"},
        {"name" : "Explosion | පිපිරීම", "id": "10", "value" : "EXPLOSION"},
        {"name" : "Air Raids | ගුවන් ප්‍රහාර", "id": "11", "value" : "AIR_RAIDS"},
        {"name" : "Civil Or Internal Strife | සිවිල් හෝ අභ්‍යන්තර ගැටුම්", "id": "12", "value" : "CIVIL"},
        {"name" : "Chemical Accident | රසායනික අනතුරු", "id": "13", "value" : "CHEMICAL"},
        {"name" : "Radiological Emergency | විකිරනශීලත්වයෙන් හටගත් හදිසි අවස්ථාවක්", "id": "14", "value" : "RADIOLOGICAL"},
        {"name" : "Oil Spills Including Inland & Marine | තෙල් පිටාර ගැලීමක්", "id": "15", "value" : "OIL_SPILLS"},
        {"name" : "Nuclear Disaster | න්‍යෂ්ටික ආපදා", "id": "16", "value" : "NUCLEAR"},
        {"name" : "Urban & Forest Fire | නාගරික හා වනාන්තර ගිනිගැනීමක්", "id": "17", "value" : "FOREST_FIRE"},
        {"name" : "Coastal Erosion | වෙරල ඛාදනය වීමක්", "id": "18", "value" : "EROSION"},
        {"name" : "Tornados, Lightening Strikes & Severe Thunder Storms | ටෝනාඩෝ චණ්ඩ මාරුතයක්", "id": "19", "value" : "LIGHTENING"},
        {"name" : "Other | වෙනත්", "id": "20", "value" : "OTHER"}];


    var mandatoryFields = {
        'per_fullname': 'Full Name',
        'per_mobile': 'Mobile Number',
        'req_address': 'Address of the Incident',
        'req_type_REF': 'Request Type',
        'req_details': 'Details of Request'
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
        $scope.model.req_type_REF = $scope.selection.values;
        //change here


        angular.forEach(mandatoryFields, function (fieldName, key) {
            var value = $scope.model[key];
            if (key !== 'req_type_REF') {

                if (!value || !value.trim()) {
                    msg += ' - ' + fieldName + '\n';
                    invalid = true;
                }
            }
        });

        if (invalid) {
            return msg;
        } else {
            return false;
        }

    };

    $scope.submitRequest = function () {
        console.log($scope.selection.values);
        var invalid = $scope.isInvalidForm();
        if (invalid) {
            alert(invalid);
        } else {
            $scope.busy = true;
            $scope.calculateTotalHeadCount();
            console.log($scope.model)
            $http({
                method: 'POST',
                url: 'http://117.dmc.gov.lk/one-one-seven/public/requests',
                data: $scope.model
            }).then(function successCallback(response) {
                $scope.busy = false;
                $scope.model = {};
                $scope.selection = {};
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
