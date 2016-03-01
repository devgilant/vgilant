angular
    .module('vgilantApp', ['ngMaterial'])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

/*
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);*/
