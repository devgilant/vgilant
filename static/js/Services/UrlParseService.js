(function() {
    'use strict';

    angular
        .module('vgilantApp')
        .factory('urlParseService', urlParseService);

    function urlParseService() {
        return {
            parseParams: function(location) {
                var pairs = location.substring(location.indexOf('?')+1).split("&");
                var obj = {};
                var pair;
                var i;

                for (i in pairs) {
                    if (pairs[i] === "") continue;

                    pair = pairs[i].split("=");
                    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                }

                return obj;
            }
        }
    }

})();
