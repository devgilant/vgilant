(function() {
    'use strict';

    angular
        .module('vgilantApp')
        .controller('NewServiceController', ['$location', 'urlParseService', NewServiceController]);

    function NewServiceController($location, urlParseService) {
        var self = this;
        // list of `service` value/display objects
        self.NewServiceName = urlParseService.parseParams($location.url()).name;

        // ******************************
        // Internal methods
        // ******************************
    }
})();
