'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('errorview', {
        url: '/errorview',
        templateUrl: 'app/errorview/errorview.html',
        controller: 'ErrorviewCtrl'
      });
  });