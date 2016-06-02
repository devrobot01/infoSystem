'use strict';

angular.module('infoSystemApp')
  .controller('ServiceviewCtrl', function ($scope, Sent, Arguments) {
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


      $scope.lampenstromKalibrieren = function() {
        $scope.args = Arguments.get();
        Sent.sentVal({ type: '1' , modul: $scope.args[2]+1, device: $scope.args[1]});
      };

      $scope.resetBrstd = function() {
        $scope.args = Arguments.get();
        Sent.sentVal({ modul: $scope.args[2]+1, device: $scope.args[1],  type: '0' });
      };
      $scope.errorRelais = function() {
        $scope.args = Arguments.get();
        Sent.sentVal({ modul: $scope.args[2], type: '4' });
      };
      $scope.ampere_is = function() {
        Sent.sentVal({type: '000', ampere_is: '1' });
      };
      $scope.ampere_target = function() {
        Sent.sentVal({type: '000', ampere_target: '1' });
      };

      //console.log('$scope.refresh ' + $scope.refresh);
    }
  });
