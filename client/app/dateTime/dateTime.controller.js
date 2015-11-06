'use strict';

angular.module('infoSystemApp')
    .controller('DateTimeCtrl', function ($scope) {
        $scope.dateTime = {
            date: '21.10.2015',
            time: '13:37',
            calendar: 'calendarView'
        };
    });
