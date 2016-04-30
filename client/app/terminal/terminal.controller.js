'use strict';

angular.module('infoSystemApp')
    .controller('TerminalCtrl', function ($scope, Modal, Auth, socket, $http) {

        $scope.icon = {
            uv: {
                true: "assets/images/pictos/ic_check_box_24px.svg",
                false: "assets/images/pictos/ic_check_box_outline_blank_24px.svg",
            },
                270: "images/pictos/ic_arrow_forward_24px.svg",
                360: "images/pictos/ic_vertical_align_bottom_24px.svg"
        };

        //var socket = io.connect('localhost:9000');

       /*socket.on('count', function (data) {
            console.log(data);
        });*/

        $http.get('/api/serialports').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('serialport', $scope.awesomeThings);
            console.log($scope.awesomeThings);
        });

        $scope.deviceList = [{
            group:[
            {
                power: false,
                uv: false,
                powerOn_hours: '0',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            },{
                power: false,
                uv: false,
                powerOn_hours: '0',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            },{
                power: false,
                uv: false,
                powerOn_hours: '0',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            }]},{
            group:[
            {
                power: false,
                uv: false,
                powerOn_hours: '2',
                service_code: 3,
                service_date: '',
                error_code: -1,
                error_date: ''
            }, {
                power: true,
                uv: false,
                powerOn_hours: '3',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            }, {
                power: false,
                uv: false,
                powerOn_hours: '4',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            }]
        }];
        $scope._counter = 0;
        $scope.go = function(targetId){
            if(targetId >= 0 && targetId < $scope.deviceList.length) {
                $scope._counter = targetId;
            }
        };

        $scope.switchPower = function(device, group) {
            if(!Auth.isLoggedIn()) {
                console.log("row: " + device + " col: " + group);
                if ($scope.deviceList[group].group[device].power === false) {
                    $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
                } else {
                    $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
                    if($scope.deviceList[group].group[device].uv == true) {
                        $scope.deviceList[group].group[device].uv = !$scope.deviceList[group].group[device].uv;
                    }
                }
            }
        };
        $scope.switchUv = function(device, group) {
            if(!Auth.isLoggedIn()) {
                if ($scope.deviceList[group].group[device].power === false) {
                } else {
                    $scope.deviceList[group].group[device].uv = !$scope.deviceList[group].group[device].uv;
                }
            }
        };

        if(Auth.isLoggedIn()) {
            $scope.adminview = Modal.confirm.change(function (device) {});

        }
        if(!Auth.isLoggedIn()) {
            $scope.errorview = Modal.confirm.error(function (device) {});

        }
    });
