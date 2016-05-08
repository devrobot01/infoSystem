'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('serviceview', {
        url: '/serviceview',
        templateUrl: 'app/serviceview/serviceview.html',
        controller: 'ServiceviewCtrl'
      });
  });