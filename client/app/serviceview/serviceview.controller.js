'use strict';

angular.module('infoSystemApp')
  .controller('ServiceviewCtrl', function ($scope, Sent, Modal) {
    $scope.message = 'Hello';

    $scope.refresh = false;

    console.log();

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
        Sent.sentVal({ id: '1' });
      };

      //console.log('$scope.refresh ' + $scope.refresh);
    }
  });
