'use strict';

angular.module('infoSystemApp')
  .controller('ServiceviewCtrl', function ($scope, Sent) {
    $scope.refresh = false;

    $scope.refreshValues = function () {
      $scope.refresh = !$scope.refresh;
      $scope.percent = 0;

      var refreshIntervalId = setInterval(function () {
        $scope.percent += 10;
        if($scope.percent >= 100){
          $scope.refresh = !$scope.refresh;
          clearInterval(refreshIntervalId);
        }
      },400);

      $scope.lampenstromEinmessen = function() {
        Sent.sentVal({ type: '1' });
      };

      $scope.resetBrstd = function() {
        Sent.sentVal({ type: '0' });
      }

      //console.log('$scope.refresh ' + $scope.refresh);
    }
  });
