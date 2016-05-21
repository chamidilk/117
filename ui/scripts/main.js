/**
 * You must include the dependency on 'ngMaterial' 
 */
var app = angular.module('177App', ['ui.router'])
        .controller('RequestHelpController', RequestHelpController);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/select-language");

    $stateProvider
            .state('languageSelector', {
                url: "/select-language",
                templateUrl: "partials/language-selector/language-selector.html"
            });
});
