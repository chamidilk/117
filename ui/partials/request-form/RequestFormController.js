/* 
 * 
 */

function RequestFormController($scope, $http, $stateParams) {


    //Languages: 'SINHALA', 'TAMIL', 'ENGLISH'
    $scope.languages = ['SINHALA', 'TAMIL', 'ENGLISH'];
    console.log($stateParams.language);

    $scope.model = {};

    $scope.selection = {
    };


    $scope.categories_ENGLISH = [
        {"name" : "Evacuation", "id": "1", "value" : "EVAC"},
        {"name" : "Locate Missing Person", "id": "2", "value" : "MISSING"},
        {"name" : "Medical", "id": "3", "value" : "MEDICAL"},
        {"name" : "Bedding Items", "id": "4", "value" : "BEDDING"},
        {"name" : "Clothes", "id": "5", "value" : "CLOTHES"},
        {"name" : "Food Items", "id": "6", "value" : "FOOD"},
        {"name" : "Non-food Items", "id": "7", "value" : "NONFOOD"},
        {"name" : "School Items", "id": "8", "value" : "SCHOOL"},
        {"name" : "Search & Rescue Items", "id": "9", "value" : "SEARCH"},
        {"name" : "Shelter", "id": "10", "value" : "SHELTER"},
        {"name" : "Water", "id": "11", "value" : "WATER"},
        {"name" : "Sanitation", "id": "12", "value" : "SANITATION"},
        {"name" : "Repair to Damages", "id": "13", "value" : "DAMAGE"},
        {"name" : "Other", "id": "14", "value" : "OTHER"}];

    $scope.categories_TAMIL = [
        {"name" : "Evacuation | வெளியேற்றுதல்", "id": "1", "value" : "EVAC"},
        {"name" : "Locate Missing Person | காணாமல் போனவர்கள் கண்டறிவது", "id": "2", "value" : "MISSING"},
        {"name" : "Medical | மருத்துவ உதவி", "id": "3", "value" : "MEDICAL"},
        {"name" : "Bedding Items | படுக்கைப் பொருட்கள்", "id": "4", "value" : "BEDDING"},
        {"name" : "Clothes | ஆடைகள்", "id": "5", "value" : "CLOTHES"},
        {"name" : "Food Items| உணவு பொருட்கள்", "id": "6", "value" : "FOOD"},
        {"name" : "Non-food Items | உணவு அல்லாத பொருட்கள்", "id": "7", "value" : "NONFOOD"},
        {"name" : "School Items | பாடசாலை உபகரணங்கள்", "id": "8", "value" : "SCHOOL"},
        {"name" : "Search & Rescue Items | தேடுதல் மற்றும் மீட்பு பொருட்கள்", "id": "9", "value" : "SEARCH"},
        {"name" : "Shelter | அடைக்கலம்", "id": "10", "value" : "SHELTER"},
        {"name" : "Water | நீர்", "id": "11", "value" : "WATER"},
        {"name" : "Sanitation | சுகாதார வசதிகள்", "id": "12", "value" : "SANITATION"},
        {"name" : "Repair to Damages | சேதங்கள் சரிசெய்தல்", "id": "13", "value" : "DAMAGE"},
        {"name" : "Other | வேறு", "id": "14", "value" : "OTHER"}];

    $scope.categories_SINHALA = [
        {"name" : "Evacuation | බේරාගැනීම", "id": "1", "value" : "EVAC"},
        {"name" : "Locate Missing Person | අතුරුදහන් වුවන් සෙවීම", "id": "2", "value" : "MISSING"},
        {"name" : "Medical | වෛද්‍යාදාර", "id": "3", "value" : "MEDICAL"},
        {"name" : "Bedding Items | නිදන ද්‍රව්‍ය", "id": "4", "value" : "BEDDING"},
        {"name" : "Clothes | ඇඳුම්", "id": "5", "value" : "CLOTHES"},
        {"name" : "Food Items| ආහාර", "id": "6", "value" : "FOOD"},
        {"name" : "Non-food Items | ආහාර නොවන ද්‍රව්‍ය", "id": "7", "value" : "NONFOOD"},
        {"name" : "School Items | පාසල් උපකරණ", "id": "8", "value" : "SCHOOL"},
        {"name" : "Search & Rescue Items | සෙව්ම් හා මුදවාගැනිම්", "id": "9", "value" : "SEARCH"},
        {"name" : "Shelter | තාවකාලික නවාතැන්", "id": "10", "value" : "SHELTER"},
        {"name" : "Water | ජලය", "id": "11", "value" : "WATER"},
        {"name" : "Sanitation | සනීපාරක්ෂාව", "id": "12", "value" : "SANITATION"},
        {"name" : "Repair to Damages | ප්‍රතිසංස්කරණය", "id": "13", "value" : "DAMAGE"},
        {"name" : "Other | වෙනත්", "id": "14", "value" : "OTHER"}];

    $scope.categories = $stateParams.language == $scope.languages[0]? $scope.categories_SINHALA: $stateParams.language == $scope.languages[1]? $scope.categories_TAMIL: $scope.categories_ENGLISH;


    $scope.disasterCategories_ENGLISH = [
        {"name" : "Landslide", "id": "21", "value" : "LANDSLIDE"},
        {"name" : "Flood", "id": "22", "value" : "FLOOD"},
        {"name" : "Cyclone", "id": "1", "value" : "CYCLONE"},
        {"name" : "Drought", "id": "2", "value" : "DROUGHT"},
        {"name" : "Industrial Hazard", "id": "3", "value" : "INDUSTRIAL_HAZARD"},
        {"name" : "Tsunami", "id": "4", "value" : "TSUNAMI"},
        {"name" : "Earthquake", "id": "5", "value" : "EARTHQUAKE"},
        {"name" : "Air Hazard", "id": "6", "value" : "AIR_HAZARD"},
        {"name" : "Maritime Hazard", "id": "7", "value" : "MARITIME_HAZARD"},
        {"name" : "Fire", "id": "8", "value" : "FIRE"},
        {"name" : "Epidemic", "id": "9", "value" : "EPIDEMIC"},
        {"name" : "Explosion", "id": "10", "value" : "EXPLOSION"},
        {"name" : "Air Raids", "id": "11", "value" : "AIR_RAIDS"},
        {"name" : "Civil Or Internal Strife", "id": "12", "value" : "CIVIL"},
        {"name" : "Chemical Accident", "id": "13", "value" : "CHEMICAL"},
        {"name" : "Radiological Emergency", "id": "14", "value" : "RADIOLOGICAL"},
        {"name" : "Oil Spills Including Inland & Marine", "id": "15", "value" : "OIL_SPILLS"},
        {"name" : "Nuclear Disaster", "id": "16", "value" : "NUCLEAR"},
        {"name" : "Urban & Forest Fire", "id": "17", "value" : "FOREST_FIRE"},
        {"name" : "Coastal Erosion", "id": "18", "value" : "EROSION"},
        {"name" : "Tornados, Lightening Strikes & Severe Thunder Storms", "id": "19", "value" : "LIGHTENING"},
        {"name" : "Other", "id": "20", "value" : "OTHER"}];

    $scope.disasterCategories_TAMIL = [
        {"name" : "Landslide | மண்சரிவு", "id": "21", "value" : "LANDSLIDE"},
        {"name" : "Flood | வெள்ளம்", "id": "22", "value" : "FLOOD"},
        {"name" : "Cyclone | சூறாவளி", "id": "1", "value" : "CYCLONE"},
        {"name" : "Drought | வறட்சி", "id": "2", "value" : "DROUGHT"},
        {"name" : "Industrial Hazard | தொழிட்சாலைக்கழிவு", "id": "3", "value" : "INDUSTRIAL_HAZARD"},
        {"name" : "Tsunami | சுணாமி", "id": "4", "value" : "TSUNAMI"},
        {"name" : "Earthquake | நில அதிர்வு", "id": "5", "value" : "EARTHQUAKE"},
        {"name" : "Air Hazard | விமானத்தாக்குதல்", "id": "6", "value" : "AIR_HAZARD"},
        {"name" : "Maritime Hazard | கடல் கொந்தளிப்பு", "id": "7", "value" : "MARITIME_HAZARD"},
        {"name" : "Fire | தீ /நெருப்பு", "id": "8", "value" : "FIRE"},
        {"name" : "Epidemic | தொற்றுநோய்", "id": "9", "value" : "EPIDEMIC"},
        {"name" : "Explosion | வெடிப்பு", "id": "10", "value" : "EXPLOSION"},
        {"name" : "Air Raids | வான் தாக்குதல்", "id": "11", "value" : "AIR_RAIDS"},
        {"name" : "Civil Or Internal Strife | சமூக மற்றும் தொழிற்சங்க கலவரம்", "id": "12", "value" : "CIVIL"},
        {"name" : "Chemical Accident | இரசாயன தாக்குதல்", "id": "13", "value" : "CHEMICAL"},
        {"name" : "Radiological Emergency | கதிர் தாக்கம்", "id": "14", "value" : "RADIOLOGICAL"},
        {"name" : "Oil Spills Including Inland & Marine | தீவு மற்றும் கடலுடன் எண்ணெய் கலத்தல்", "id": "15", "value" : "OIL_SPILLS"},
        {"name" : "Nuclear Disaster | அணு தாக்கம்", "id": "16", "value" : "NUCLEAR"},
        {"name" : "Urban & Forest Fire | நகர்புற மற்றும் காட்டுத்தீ", "id": "17", "value" : "FOREST_FIRE"},
        {"name" : "Coastal Erosion | கடற்கரை அரிப்பு", "id": "18", "value" : "EROSION"},
        {"name" : "Tornados, Lightening Strikes & Severe Thunder Storms | சூறாவளி , மின்னல் தாக்கம் மற்றும் இடி புயல் தாக்கம்", "id": "19", "value" : "LIGHTENING"},
        {"name" : "Other | வேறு", "id": "20", "value" : "OTHER"}];
    
    
    $scope.disasterCategories_SINHALA = [
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

    $scope.disasterCategories = $stateParams.language == $scope.languages[0]? $scope.disasterCategories_SINHALA: $stateParams.language == $scope.languages[1]? $scope.disasterCategories_TAMIL: $scope.disasterCategories_ENGLISH;

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
