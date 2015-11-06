'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('weather', {
        url: '/weather',
        templateUrl: 'app/weather/weather.html',
        controller: 'WeatherCtrl'
      });
  });