/* 
 * 
 */

function ControlCenterController($scope, $http, $state, $uibModal, $cookies) {
    
     var myAppModule = angular.module('MyApp', ['ui.bootstrap.datetimepicker']);


    $scope.requests = [];
    $scope.offset = 1;
    $scope.limit = 20;
    $scope.requestTypes = [ "EVAC", "MISSING" , "MEDICAL" , "CLOTHES" , "SECURITY" , "FOOD" , "WARNING" , "SCHOOL" , "SEARCH" , "SHELTER" , "WATER" , "SANITATION" , "POWER" , "DAMAGE", "OTHER"];
    
    $scope.disasterTypes = [ "LANDSLIDE", "FLOOD" , "CYCLONE" , "DROUGHT" , "INDUSTRIAL_HAZARD" , "TSUNAMI" , "EARTHQUAKE" , "AIR_HAZARD" , "MARITIME_HAZARD" , "FIRE" , "EPIDEMIC" , "EXPLOSION" , "AIR_RAIDS" , "CIVIL" , "CHEMICAL" , "RADIOLOGICAL" , "OIL_SPILLS" , "NUCLEAR" , "FOREST_FIRE" , "EROSION" , "LIGHTENING" , "OTHER" ];
    
    $scope.statusTypes = [ "OPEN", "PARTIAL" , "CLOSED" , "ALLOCATED" , "DUPLICATE" , "REJECTED"];

    $scope.getHeader = function () {

      var dictionary = $scope.requests[0];

      var keys = [];
      for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            keys.push(key);
        }
      }

      return keys;

    };


    $scope.filters = {
        reqstatus_REF: 'OPEN'
    };

    $scope.townSelectorOptions = {
        country: 'lk',
        types: '(cities)'
    };

    $scope.init = function () {

        var encodedCredentials = $cookies.get('encodedCredentials');

        if(encodedCredentials == "" || encodedCredentials == undefined || encodedCredentials == null){
            $state.go('login');

        }

        $scope.loadRequests();
    };

    $scope.loadNextPage = function () {
//        alert(1);
    };


  $scope.currentStatus = 'None';
  $scope.currentID = 0;

  $scope.animationsEnabled = true;

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

    $scope.changeStatus = function (id, currentStatus) {

        $scope.currentStatus = currentStatus;
        $scope.currentID = id;
        size = 'lg';
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            currentStatus: function () {
              return $scope.currentStatus;
            },
            req_ID: function () {
              return $scope.currentID;
            }
          }
        });

        modalInstance.result.then(function (status) {
          console.log('done')
        }, function () {
          console.log('error');
        });
    };

    $scope.openDetails = function(request){

      console.log('right');
      $scope.requestSelected = request;
      size = 'lg';
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myDetailsModalContent.html',
          controller: 'DetailsModalController',
          size: size,
          resolve: {
            requestSelected: function () {
              return $scope.requestSelected;
            }
          }
        });

        modalInstance.result.then(function (status) {
          console.log('done')
        }, function () {
          console.log('error');
        });

    }

    $scope.loadRequests = function () {

        console.log('loading...');

        var encodedCredentials = $cookies.get('encodedCredentials');

        $scope.loading = true;
        $scope.requests = [];
//        $scope.filters.limit = $scope.limit;
//        $scope.filters.offset = $scope.offset;

        var clone = angular.copy($scope.filters);

        angular.forEach(clone, function (value, key) {
            if (!value || !value.trim()) {
                delete $scope.filters[key];
            }
        });
        if($scope.filters.startDate) {
            var date = new Date($scope.filters.startDate);
            $scope.filters.startDate = date.getFullYear() + "-" + date.getMonth() + "-" +
                date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        if($scope.filters.endDate) {
            var date = new Date($scope.filters.endDate);
            $scope.filters.endDate = date.getFullYear() + "-" + date.getMonth() + "-" +
                date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        $http({
            method: 'GET',
            url: 'http://117.dmc.gov.lk/one-one-seven/public/requests',
            headers: {
              'X-Authorization': 'Basic '+ encodedCredentials
            },
            params: $scope.filters
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
