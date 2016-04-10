'use strict';

angular.module('infoSystemApp')
    .controller('TerminalCtrl', function ($scope) {

        $scope.icon = {
            uv: {
                true: "assets/images/pictos/ic_check_box_24px.svg",
                false: "assets/images/pictos/ic_check_box_outline_blank_24px.svg",
            },
                270: "images/pictos/ic_arrow_forward_24px.svg",
                360: "images/pictos/ic_vertical_align_bottom_24px.svg"
        };

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
            },{
                power: false,
                uv: false,
                powerOn_hours: '0',
                service_code: -1,
                service_date: '',
                error_code: -1,
                error_date: ''
            }, {
                power: true,
                uv: true,
                powerOn_hours: '1',
                service_code: -1,
                service_date: '',
                error_code: 42,
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

        $scope.selectRow = function(device, group) {
            console.log("row: " + device + " col: " + group);
            if($scope.deviceList[group].group[device].power === false) {
                $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
            } else {
                $scope.deviceList[group].group[device].uv = !$scope.deviceList[group].group[device].uv;
                if($scope.deviceList[group].group[device].uv === false){
                    $scope.deviceList[group].group[device].power = !$scope.deviceList[group].group[device].power;
                }
            }
        };
    });
