'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('commuter', {
        url: '/commuter',
        templateUrl: 'app/commuter/commuter.html',
        controller: 'CommuterCtrl'
      });
  });