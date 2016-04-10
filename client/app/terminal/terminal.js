'use strict';

angular.module('infoSystemApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('terminal', {
        url: '/terminal',
        templateUrl: 'app/terminal/terminal.html',
        controller: 'TerminalCtrl'
      });
  });