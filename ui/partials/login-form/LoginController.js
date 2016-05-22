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

		console.log(str)

		var encodedString = btoa(str);
		/*$rootScope.encodedCredentials = encodedString;*/
		/*$cookies.put('encodedCredentials', encodedString)
		$state.go('dashboard');*/

		$http({
            method: 'POST',
            url: 'http://220.247.222.29/one-one-seven/public/login',
            headers: {
    					'Authorization': 'Basic '+ encodedString
    				}
        }).then(function successCallback(response) {
            console.log(response);
            $cookies.put('encodedCredentials', encodedString)
            $state.go('dashboard');
        }, function errorCallback(response) {
            console.error(response);
        });

		console.log('logginng in' + $cookies.get('encodedCredentials'))


	}

   
}
