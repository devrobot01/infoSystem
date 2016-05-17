'use strict';

angular.module('infoSystemApp')
  .controller('TerminalCtrl', function ($scope, Modal, Auth, socket, $http, Sent) {
    $scope.addGroup = function () {
      var group = {
        group: [{
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: [1,2],
          error_date: '',
          power_is: '',
          power_should: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: -1,
          error_date: '',
          power_is: '',
          power_should: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: -1,
          error_date: '',
          power_is: '',
          power_should: '',
        }]
      };
      $scope.deviceList.push(group);
    };
    $scope.deviceList = [];
    $scope.addGroup();
    $scope.awesomeThings = {};
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('/api/serialports').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('serialport', $scope.awesomeThings);
      console.log($scope.awesomeThings);
      $scope.updateVal();
    });

    $scope.convertHex = function (val){
      var int = parseInt(val,16);
      return int;
    };

    $scope.startFunction = function(){
      /*$http.put('/api/serialports/1').success(function(data) {
       console.log('$http.put' + data);
       });*/
      $scope.errorview = Modal.confirm.error(function (device) {});
    };


    $scope.updateVal = function () {
      for (var key in $scope.awesomeThings) {
        var _modul = parseInt($scope.awesomeThings[key].modul) - 1;
        // TODO: wenn zB 1 und 3 belegt sind gibt es fehler weil modul 2 fehlt
        // 00 = Zählerstände
        if ($scope.awesomeThings[key].value[3] == '00') {
          if (angular.isUndefined($scope.deviceList[_modul])) {
            $scope.addGroup();
          }
          $scope.deviceList[_modul].group[0].powerOn_hours = $scope.convertHex($scope.awesomeThings[key].value[5]); // To convert back to hex, you can use toString num.toString(16)
          $scope.deviceList[_modul].group[1].powerOn_hours = $scope.convertHex($scope.awesomeThings[key].value[7]);
          $scope.deviceList[_modul].group[2].powerOn_hours = $scope.convertHex($scope.awesomeThings[key].value[9]);
        }
        // 01 = Strom ist Werte
        if ($scope.awesomeThings[key].value[3] == '01') {
          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        // 02 = Strom soll Wert
        if ($scope.awesomeThings[key].value[3] == '02') {
          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        if ($scope.awesomeThings[key].value[3] == '03') {
          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        if ($scope.awesomeThings[key].value[3] == '04') {
          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        if ($scope.awesomeThings[key].value[3] == '05') {
          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        if ($scope.awesomeThings[key].value[3] == '06') {

          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
        if ($scope.awesomeThings[key].value[3] == '07') {

          /*if (angular.isUndefined($scope.deviceList[key])) {
           $scope.addGroup();
           }
           //hex stundenzahl in int wandeln
           $scope.deviceList[key].group[0].powerOn_hours = $scope.awesomeThings[key].value[5];
           $scope.deviceList[key].group[1].powerOn_hours = $scope.awesomeThings[key].value[7];
           $scope.deviceList[key].group[2].powerOn_hours = $scope.awesomeThings[key].value[9];*/
        }
      }
    };

    $scope._counter = 0;
    $scope.go = function (targetId) {
      if (targetId >= 0 && targetId < $scope.deviceList.length) {
        $scope._counter = targetId;
      }
    };

    $scope.lampenstromEinmessen = function() {
      Sent.sentVal({ id: '01' });
    };

    $scope.switchPower = function (device, group) {
      if (!Auth.isLoggedIn()) {
        console.log("row: " + device + " col: " + group);
        if ($scope.deviceList[group].group[device].power === false) {
          $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
        } else {
          $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
          if ($scope.deviceList[group].group[device].uv == true) {
            $scope.deviceList[group].group[device].uv = !$scope.deviceList[group].group[device].uv;
          }
        }
      }
    };
    $scope.switchUv = function (device, group) {
      if (!Auth.isLoggedIn()) {
        if ($scope.deviceList[group].group[device].power === false) {
        } else {
          $scope.deviceList[group].group[device].uv = !$scope.deviceList[group].group[device].uv;
        }
      }
    };

    $scope.setadminview = function () {
      console.log("test");
    }
    $scope.adminview = Modal.confirm.service(function (device) {console.log("lksajdfölsajfösa")});

    $scope.errorview = Modal.confirm.error(function (device) {})
  });
