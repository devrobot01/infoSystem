'use strict';

angular.module('infoSystemApp')
    .controller('DateTimeCtrl', function ($scope, $interval) {
        $scope.dateTime = {
            date: '21.10.2015',
            time: '13:37'
        };

        var tick = function() {
            $scope.clock = Date.now();
        };
        tick();
        $interval(tick, 1000);
    });
