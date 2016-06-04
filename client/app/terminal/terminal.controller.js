'use strict';

angular.module('infoSystemApp')
  .controller('TerminalCtrl', function ($rootScope, $scope, Modal, Auth, socket, $http, Sent) {
    $scope.addGroup = function () {
      var group = {
        group: [{
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: '',
          service_date: '',
          warning_code: '',
          error_code: [],
          error_display: '',
          error_state: '',
          ampere_is: '',
          ampere_target: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: '',
          service_date: '',
          warning_code: '',
          error_code: [],
          error_display: '',
          error_state: '',
          ampere_is: '',
          ampere_target: '',
        }, {
          power: false,
          uv: false,
          powerOn_hours: '0',
          service_code: '',
          service_date: '',
          warning_code: '',
          error_code: [],
          error_display: '',
          error_state: '',
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
    $scope.globalWarning = 0;
    $scope.globalAlarm = 0;

    $http.get('/api/serialports').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('serialport', $scope.awesomeThings, function(){
        $scope.awesomeThings = awesomeThings;

        $scope.updateVal();
        //console.log($scope.awesomeThings);
      });
      $scope.updateVal();
    });

    function waitForDevice(callback) {
      setTimeout(callback, 3000);
    }

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
          var valuesAmpere = $scope.awesomeThings[key].value[5];
          valuesAmpere += $scope.awesomeThings[key].value[4];
          $scope.deviceList[_modul].group[2].ampere_target = parseInt(valuesAmpere,16)/100; // To convert back to hex, you can use toString num.toString(16)
          valuesAmpere = $scope.awesomeThings[key].value[7];
          valuesAmpere += $scope.awesomeThings[key].value[6];
          $scope.deviceList[_modul].group[1].ampere_target = parseInt(valuesAmpere,16)/100;
          valuesAmpere = $scope.awesomeThings[key].value[9];
          valuesAmpere += $scope.awesomeThings[key].value[8];
          $scope.deviceList[_modul].group[0].ampere_target = parseInt(valuesAmpere,16)/100;
        }
        if ($scope.awesomeThings[key].value[3] == '03') {
        }
        if ($scope.awesomeThings[key].value[3] == '04') {
        }

        if ($scope.awesomeThings[key].value[3] == '05') {
          if (angular.isUndefined($scope.deviceList[_modul])) {
            console.log("Missing Group");
          }
          var lsb = parseInt($scope.awesomeThings[key].value[4],16).toString(2);
          var msb = parseInt($scope.awesomeThings[key].value[5],16).toString(2);

          $scope.fillTheByte = function (bits) {
            if (bits.length < 8) {
              var ext = '';
              for (var i = bits.length; i < 8; i++) {
                if (msb[i] != 0 || bits[i] != 1) {
                  ext += 0;
                }
              }
              return ext + bits;
            }
            return bits;
          };

          lsb = $scope.fillTheByte(lsb);
          msb = $scope.fillTheByte(msb);

          var timerOrder = 500;
          var timerChange = 0;

          if($scope.deviceList[_modul].group[2].powerOn_hours <= timerOrder){
            $scope.deviceList[_modul].group[2].error_code[5] = 6;
            $scope.deviceList[_modul].group[2].service_code = "UV Röhren bestellen"
          }if($scope.deviceList[_modul].group[2].powerOn_hours <= timerChange){
            $scope.deviceList[_modul].group[2].error_code[4] = 5;
            $scope.deviceList[_modul].group[2].service_code = "UV Röhren ersetzen"
          }if($scope.deviceList[_modul].group[2].powerOn_hours > timerChange && $scope.deviceList[_modul].group[2].powerOn_hours > timerOrder){
            $scope.deviceList[_modul].group[2].service_code = ''
          }if(msb[4] == 1){
            $scope.deviceList[_modul].group[2].error_code[0] = 1;
            $scope.deviceList[_modul].group[2].error_display = "Röhrenfehler"
          }if(msb[4] != 1){
            $scope.deviceList[_modul].group[2].error_code[0] = 0;
          }if(msb[5] == 1){
            $scope.deviceList[_modul].group[2].error_code[1] = 2;
            $scope.deviceList[_modul].group[2].error_display = "Unterdruck fehlt"
          }if(msb[5] != 1){
            $scope.deviceList[_modul].group[2].error_code[1] = 0;
          }if(msb[6] == 1){
            $scope.deviceList[_modul].group[2].error_code[2] = 3;
            $scope.deviceList[_modul].group[2].error_display = "Haube offen"
          }if(msb[6] != 1){
            $scope.deviceList[_modul].group[2].error_code[2] = 0;
          }if(msb[7] == 1){
            $scope.deviceList[_modul].group[2].error_code[3] = 4;
            $scope.deviceList[_modul].group[2].warning_display = "Abluft einschalten"
            $scope.deviceList[_modul].group[2].warning_state = true;
            $scope.globalWarning++;
          }if(msb[7] != 1){
            $scope.deviceList[_modul].group[2].error_code[3] = 0;
          }if(msb[4] == 1 || msb[5] == 1 || msb[6] == 1){
            $scope.deviceList[_modul].group[2].error_state = true;
          }if(msb[4] != 1 && msb[5] != 1 && msb[6] != 1){
            $scope.deviceList[_modul].group[2].error_state = false;
            $scope.deviceList[_modul].group[2].error_display = '';
          }if(msb[7] != 1){
            $scope.deviceList[_modul].group[2].warning_state = false;
            $scope.deviceList[_modul].group[2].warning_display = '';
            $scope.globalWarning--;
          }

          if($scope.deviceList[_modul].group[1].powerOn_hours <= timerOrder){
            $scope.deviceList[_modul].group[1].error_code[5] = 6;
            $scope.deviceList[_modul].group[1].service_code = "UV Röhren bestellen"
          }if($scope.deviceList[_modul].group[1].powerOn_hours <= timerChange){
            $scope.deviceList[_modul].group[1].error_code[4] = 5;
            $scope.deviceList[_modul].group[1].service_code = "UV Röhren ersetzen"
          }if($scope.deviceList[_modul].group[1].powerOn_hours > timerChange && $scope.deviceList[_modul].group[1].powerOn_hours > timerOrder){
            $scope.deviceList[_modul].group[1].service_code = ''
          }if(lsb[0] == 1){
            $scope.deviceList[_modul].group[1].error_code[0] = 1;
            $scope.deviceList[_modul].group[1].error_display = "Röhrenfehler"
          }if(lsb[0] != 1){
            $scope.deviceList[_modul].group[1].error_code[0] = 0;
          }if(lsb[1] == 1){
            $scope.deviceList[_modul].group[1].error_code[1] = 2;
            $scope.deviceList[_modul].group[1].error_display = "Unterdruck fehlt"
          }if(lsb[1] != 1){
            $scope.deviceList[_modul].group[1].error_code[1] = 0;
          }if(lsb[2] == 1){
            $scope.deviceList[_modul].group[1].error_code[2] = 3;
            $scope.deviceList[_modul].group[1].error_display = "Haube offen"
          }if(lsb[2] != 1){
            $scope.deviceList[_modul].group[1].error_code[2] = 0;
          }if(lsb[3] == 1){
            $scope.deviceList[_modul].group[1].error_code[3] = 4;
            $scope.deviceList[_modul].group[1].warning_display = "Abluft einschalten"
            $scope.deviceList[_modul].group[1].warning_state = true;
            $scope.globalWarning++;
          }if(lsb[3] != 1){
            $scope.deviceList[_modul].group[1].error_code[3] = 0;
          }if(lsb[0] == 1 || lsb[1] == 1 || lsb[2] == 1){
            $scope.deviceList[_modul].group[1].error_state = true;
          }if(lsb[0] != 1 && lsb[1] != 1 && lsb[2] != 1){
            $scope.deviceList[_modul].group[1].error_state = false;
            $scope.deviceList[_modul].group[1].error_display = '';
          }if(lsb[3] != 1){
            $scope.deviceList[_modul].group[1].warning_state = false;
            $scope.deviceList[_modul].group[1].warning_display = '';
            $scope.globalWarning--;
          }


          if($scope.deviceList[_modul].group[0].powerOn_hours <= timerOrder){
            $scope.deviceList[_modul].group[0].error_code[5] = 6;
            $scope.deviceList[_modul].group[0].service_code = "UV Röhren bestellen"
          }if($scope.deviceList[_modul].group[0].powerOn_hours <= timerChange){
            console.log($scope.deviceList[_modul].group[0].powerOn_hours);
            console.log(_modul);
            $scope.deviceList[_modul].group[0].error_code[4] = 5;
            $scope.deviceList[_modul].group[0].service_code = "UV Röhren ersetzen"
          }if($scope.deviceList[_modul].group[0].powerOn_hours > timerChange && $scope.deviceList[_modul].group[0].powerOn_hours > timerOrder){
            $scope.deviceList[_modul].group[0].service_code = ''
          }if(lsb[4] == 1){
            $scope.deviceList[_modul].group[0].error_code[0] = 1;
            $scope.deviceList[_modul].group[0].error_display = "Röhrenfehler"
          }if(lsb[4] != 1){
            $scope.deviceList[_modul].group[0].error_code[0] = 0;
          }if(lsb[5] == 1){
            $scope.deviceList[_modul].group[0].error_code[1] = 2;
            $scope.deviceList[_modul].group[0].error_display = "Unterdruck fehlt"
          }if(lsb[5] != 1){
            $scope.deviceList[_modul].group[0].error_code[1] = 0;
          }if(lsb[6] == 1){
            $scope.deviceList[_modul].group[0].error_code[2] = 3;
            $scope.deviceList[_modul].group[0].error_display = "Haube offen"
          }if(lsb[6] != 1){
            $scope.deviceList[_modul].group[0].error_code[2] = 0;
          }if(lsb[7] == 1){
            $scope.deviceList[_modul].group[0].error_code[3] = 4;
            $scope.deviceList[_modul].group[0].warning_display = "Abluft einschalten"
            $scope.deviceList[_modul].group[0].warning_state = true;
            $scope.globalWarning++;
          }if(lsb[7] != 1){
            $scope.deviceList[_modul].group[0].error_code[3] = 0;
          }if(lsb[4] == 1 || lsb[5] == 1 || lsb[6] == 1){
            $scope.deviceList[_modul].group[0].error_state = true;
          }if(lsb[4] != 1 && lsb[5] != 1 && lsb[6] != 1){
            $scope.deviceList[_modul].group[0].error_state = false;
            $scope.deviceList[_modul].group[0].error_display = '';
          }if(lsb[7] != 1){
            $scope.deviceList[_modul].group[0].warning_state = false;
            $scope.deviceList[_modul].group[0].warning_display = '';
            $scope.globalWarning--;
          }
        }
        if ($scope.awesomeThings[key].value[3] == '06') {

          if (angular.isUndefined($scope.deviceList[_modul])) {
            console.log("Missing Group");
          }
          //hex stundenzahl in int wandeln
          var valuePower = parseInt($scope.awesomeThings[key].value[4],16).toString(2);
          var i = 0;
          if(valuePower.length > 6){
            i = valuePower.length - 6;
          }
          if(valuePower[i] == 1) {
            $scope.deviceList[_modul].group[2].power = true;
          } if(valuePower[i] != 1) {
            $scope.deviceList[_modul].group[2].power = false;
          } if(valuePower[i + 2] == 1) {
            $scope.deviceList[_modul].group[1].power = true;
          } if(valuePower[i + 2] != 1) {
            $scope.deviceList[_modul].group[1].power = false;
          } if(valuePower[i + 4] == 1) {
            $scope.deviceList[_modul].group[0].power = true;
          } if(valuePower[i + 4] != 1) {
            $scope.deviceList[_modul].group[0].power = false;
          }

          if(valuePower[i + 1] == 1) {
            $scope.deviceList[_modul].group[2].uv = true;
          }if(valuePower[i + 1] != 1) {
            $scope.deviceList[_modul].group[2].uv = false;
          } if(valuePower[i + 3] == 1) {
            $scope.deviceList[_modul].group[1].uv = true;
          }if(valuePower[i + 3] != 1) {
            $scope.deviceList[_modul].group[1].uv = false;
          } if(valuePower[i + 5] == 1) {
            $scope.deviceList[_modul].group[0].uv = true;
          }if(valuePower[i + 5] != 1) {
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

    $scope.switchPower = function (device, group) {
      if (!Auth.isLoggedIn()) {
        console.log("row: " + device + " col: " + group);
        Sent.sentVal({ type: '2', modul: group + 1, device: device });
        $http.get('/api/serialports').success(function (awesomeThings) {
          $scope.awesomeThings = awesomeThings;
          //$scope.updateVal();
        });
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
    $scope.adminview = Modal.confirm.service(function (device,tindex,dindex) {});
    $scope.errorview = Modal.confirm.error(function (device) {});

    $scope.isDisabled = false;

    $scope.disableButton = function () {
      $scope.isDisabled = !$scope.isDisabled;
      $scope.percent = 0;

      waitForDevice(function() {$scope.isDisabled = false;
                    $scope.$apply()});
    };
  });
