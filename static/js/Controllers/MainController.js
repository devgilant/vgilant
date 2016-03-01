(function() {
    'use strict';

    angular
        .module('vgilantApp')
        .controller('MainController', ['$scope',
            function($scope) {
                $scope.title = 'Vgilant';
            }
        ]);
})();
