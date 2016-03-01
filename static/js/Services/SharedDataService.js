(function() {
    'use strict';

    angular
        .module('vgilantApp')
        .factory('sharedDataService', sharedDataService);

    function sharedDataService() {
        var savedData = {}

        function set(key, value) {
            savedData[key] = value;
        }

        function get(key) {
            return savedData[key];
        }

        return {
            id: new Date().getTime(),
            set: set,
            get: get
        }
    }
})();
