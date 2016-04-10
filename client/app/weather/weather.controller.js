'use strict';

angular.module('infoSystemApp')
    .controller('WeatherCtrl', function ($scope, socket) {

        $scope.weather = {
            windsun: 'sunny',
            temp: '30',
            forecast:'15'
        };

        socket.syncUpdates('weather', $scope.weather, function(event, item, object) {
            $scope.weather = item;  // item contains the updated array
            $scope.$apply();
        });
    });
