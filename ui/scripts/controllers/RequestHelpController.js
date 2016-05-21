/* 
 * 
 */


function RequestHelpController($scope, $state) {

    $scope.languages = ['SINHALA', 'TAMIL', 'ENGLISH'];

    $scope.textMap = {
        SINHALA: {
            language: 'සින්හල',
            request_help: 'උපකාර ඉල්ලුම්'
        },
        ENGLISH: {
            language: 'English',
            request_help: 'Request Help'
        },
        TAMIL: {
            language: 'தமிழ்',
            request_help: 'உதவி வேண்டுகோள்'
        }
    };

    $scope.setLanguage = function (language) {
        $scope.language = language;
        $state.go('requestForm');
    };

}