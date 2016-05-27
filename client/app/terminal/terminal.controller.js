'use strict';

angular.module('infoSystemApp')
  .controller('TerminalCtrl', function ($rootScope, $scope, Modal, Auth, socket, $http, Sent) {
    $scope.addGroup = function () {
      var group = {
        group: [{
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: [],
          error_date: '',
          ampere_is: '',
          ampere_target: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: [],
          error_date: '',
          ampere_is: '',
          ampere_target: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: -1,
          service_date: '',
          error_code: [],
          error_date: '',
          ampere_is: '',
          ampere_target: '',
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
      socket.syncUpdates('serialport', $scope.awesomeThings, function(){
        $scope.updateVal();
      });
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
          var values = $scope.awesomeThings[key].value[5];
          values += $scope.awesomeThings[key].value[4];
          //$scope.deviceList[_modul].group[0].powerOn_hours = $scope.convertHex($scope.awesomeThings[key].value[5]); // To convert back to hex, you can use toString num.toString(16)
          $scope.deviceList[_modul].group[2].powerOn_hours = parseInt(values,16); // To convert back to hex, you can use toString num.toString(16)
          values = $scope.awesomeThings[key].value[7];
          values += $scope.awesomeThings[key].value[6];
          $scope.deviceList[_modul].group[1].powerOn_hours = parseInt(values,16);
          values = $scope.awesomeThings[key].value[9];
          values += $scope.awesomeThings[key].value[8];
          $scope.deviceList[_modul].group[0].powerOn_hours = parseInt(values,16);
        }
        // 01 = Strom ist Werte
        if ($scope.awesomeThings[key].value[3] == '01') {
          if (angular.isUndefined($scope.deviceList[_modul])) {
           console.log("Missing Group");
           }
           //hex stundenzahl in int wandeln
          var values = $scope.awesomeThings[key].value[5];
          values += $scope.awesomeThings[key].value[4];
          //$scope.deviceList[_modul].group[0].powerOn_hours = $scope.convertHex($scope.awesomeThings[key].value[5]); // To convert back to hex, you can use toString num.toString(16)
          $scope.deviceList[_modul].group[2].ampere_is = parseInt(values,16)/100; // To convert back to hex, you can use toString num.toString(16)
          values = $scope.awesomeThings[key].value[7];
          values += $scope.awesomeThings[key].value[6];
          $scope.deviceList[_modul].group[1].ampere_is = parseInt(values,16)/100;
          values = $scope.awesomeThings[key].value[9];
          values += $scope.awesomeThings[key].value[8];
          $scope.deviceList[_modul].group[0].ampere_is = parseInt(values,16)/100;
        }
        // 02 = Strom soll Wert
        if ($scope.awesomeThings[key].value[3] == '02') {
          if (angular.isUndefined($scope.deviceList[_modul])) {
            console.log("Missing Group");
          }
          //hex stundenzahl in int wandeln
          var values = $scope.awesomeThings[key].value[5];
          values += $scope.awesomeThings[key].value[4];
          $scope.deviceList[_modul].group[2].ampere_target = parseInt(values,16)/100; // To convert back to hex, you can use toString num.toString(16)
          values = $scope.awesomeThings[key].value[7];
          values += $scope.awesomeThings[key].value[6];
          $scope.deviceList[_modul].group[1].ampere_target = parseInt(values,16)/100;
          values = $scope.awesomeThings[key].value[9];
          values += $scope.awesomeThings[key].value[8];
          $scope.deviceList[_modul].group[0].ampere_target = parseInt(values,16)/100;
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
          if (angular.isUndefined($scope.deviceList[_modul])) {
            console.log("Missing Group");
          }
          var values = parseInt($scope.awesomeThings[key].value[4],16).toString(2);
          var key = values.length;

          console.log(values);
          if(values[key] == 1){
            $scope.deviceList[_modul].group[2].error_code[0] = 1;
          }if(values[key] != 1){
            $scope.deviceList[_modul].group[2].error_code[0] = 0;
          }if(values[key - 1] == 1){
            $scope.deviceList[_modul].group[2].error_code[1] = 2;
          }if(values[key - 1] != 1){
            $scope.deviceList[_modul].group[2].error_code[1] = 0;
          }if(values[key - 2] == 1){
            $scope.deviceList[_modul].group[2].error_code[2] = 3;
          }if(values[key - 2] != 1){
            $scope.deviceList[_modul].group[2].error_code[2] = 0;
          }if(values[key - 3] == 1){
            $scope.deviceList[_modul].group[2].error_code[3] = 4;
          }if(values[key - 3] != 1){
            $scope.deviceList[_modul].group[2].error_code[3] = 0;
          }
          console.log($scope.deviceList[_modul].group[2].error_code);
        }
        if ($scope.awesomeThings[key].value[3] == '06') {

          if (angular.isUndefined($scope.deviceList[_modul])) {
            console.log("Missing Group");
          }
          //hex stundenzahl in int wandeln
          var values = parseInt($scope.awesomeThings[key].value[4],16).toString(2);
          var key = 0;
          if(values.length > 6){
            key = values.length - 6;
          }
          if(values[key] == 1) {
            $scope.deviceList[_modul].group[2].power = true;
          } if(values[key] != 1) {
            $scope.deviceList[_modul].group[2].power = false;
          } if(values[key + 2] == 1) {
            $scope.deviceList[_modul].group[1].power = true;
          } if(values[key + 2] != 1) {
            $scope.deviceList[_modul].group[1].power = false;
          } if(values[key + 4] == 1) {
            $scope.deviceList[_modul].group[0].power = true;
          } if(values[key + 4] != 1) {
            $scope.deviceList[_modul].group[0].power = false;
          }

          if(values[key + 1] == 1) {
            $scope.deviceList[_modul].group[2].uv = true;
          }if(values[key + 1] != 1) {
            $scope.deviceList[_modul].group[2].uv = false;
          } if(values[key + 3] == 1) {
            $scope.deviceList[_modul].group[1].uv = true;
          }if(values[key + 3] != 1) {
            $scope.deviceList[_modul].group[1].uv = false;
          } if(values[key + 5] == 1) {
            $scope.deviceList[_modul].group[0].uv = true;
          }if(values[key + 5] != 1) {
            $scope.deviceList[_modul].group[0].uv = false;
          }


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
      Sent.sentVal({ type: '1' });
    };

    $scope.switchPower = function (device, group) {
      if (!Auth.isLoggedIn()) {
        console.log("row: " + device + " col: " + group);
        Sent.sentVal({ type: '2', modul: group + 1, device: device });
        $http.get('/api/serialports').success(function (awesomeThings) {
          $scope.awesomeThings = awesomeThings;
        })
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

    $scope.adminview = Modal.confirm.service(function (device) {});

    $scope.errorview = Modal.confirm.error(function (device) {})
  });
