'use strict';

angular.module('infoSystemApp')
    .controller('WeatherCtrl', function ($scope) {
        $scope.weather = {
            windsun: 'sunny',
            temp: '30c',
            forecast:'15c'
        };
    });
