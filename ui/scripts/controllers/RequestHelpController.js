/* 
 * 
 */


function RequestHelpController($scope, $state, $cookies) {

    $scope.languages = ['SINHALA', 'TAMIL', 'ENGLISH'];

    $scope.textMap = {
        SINHALA: {
            language: 'සිංහල',
            request_help: 'උපකාර ඉල්ලුම්',
            propose_help: 'උපකාර ඉල්ලුම්'
        },
        ENGLISH: {
            language: 'English',
            request_help: 'Request Help',
            propose_help: 'Give Help'
        },
        TAMIL: {
            language: 'தமிழ்',
            request_help: 'உதவி வேண்டுகோள்',
            propose_help: 'உதவி வேண்டுகோள்'
        }
    };

    $scope.setLanguage = function (language) {
        $scope.language = language;
        $cookies.put('lang', $scope.language);
        $state.go('requestForm', { "language": $scope.language});
    };

}
