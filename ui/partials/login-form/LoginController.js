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
		$cookies.put('encodedCredentials', encodedString)
		$state.go('dashboard');

		/*$http({
            method: 'POST',
            url: 'http://one-one-seven.herokuapp.com/public/login',
            headers: {
    					'Authorization': 'Basic '+ encodedString
    				}
        }).then(function successCallback(response) {
            console.log(response);
            $state.go('dashboard');
        }, function errorCallback(response) {
            console.error(response);
        });*/

		console.log('logginng in' + $rootScope.encodedCredentials)


	}

   
}
