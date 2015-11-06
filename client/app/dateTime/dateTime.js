'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dateTime', {
        url: '/dateTime',
        templateUrl: 'app/dateTime/dateTime.html',
        controller: 'DateTimeCtrl'
      });
  });