'use strict';

angular.module('infoSystemApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth, Modal) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/');
        };

        $scope.shutdown = Modal.confirm.accept(function () {});
        $scope.openLogin = Modal.confirm.login(function () {});

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });