/**
 * You must include the dependency on 'ngMaterial' 
 */
var app = angular.module('177App', ['ui.router', 'ngAutocomplete'])
        .controller('RequestFormController', RequestFormController)
        .controller('RequestHelpController', RequestHelpController);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/select-language");

    $stateProvider
            .state('languageSelector', {
                url: "/select-language",
                templateUrl: "partials/language-selector/language-selector.html"
            });

    $stateProvider
            .state('requestForm', {
                url: "/request-form",
                templateUrl: "partials/request-form/request-form.html"
            });
});
