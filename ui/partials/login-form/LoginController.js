/* 
 * 
 */

function LoginController($scope, $rootScope, $http, $state, $cookies) {

	//$rootScope.encodedCredentials = "";
	$cookies.put('encodedCredentials', "")

	$scope.login = function(){

		if ($scope.username == "" || $scope.password == "" || $scope.username == undefined || $scope.password == undefined ){
			return;
		}

		var str = $scope.username + ':' + $scope.password;

		//console.log(str)

		var encodedString = btoa(str);
		/*$rootScope.encodedCredentials = encodedString;*/
		/*$cookies.put('encodedCredentials', encodedString)
		$state.go('control-center');*/

		$http({
            method: 'POST',
            url: 'http://117.dmc.gov.lk/one-one-seven/public/login',
            headers: {
    					'X-Authorization': 'Basic '+ encodedString
    				}
        }).then(function successCallback(response) {
            console.log(response);
            $cookies.put('encodedCredentials', encodedString)
            $state.go('control-center');
        }, function errorCallback(response) {
            console.error(response);
        });


	}

   
}
