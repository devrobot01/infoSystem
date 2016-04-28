'use strict';

angular.module('infoSystemApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.user.password = "";

    $scope.increaseVal = function(val){
      if(val == 'clear'){
        $scope.user.password = '';
        $scope.errors.other = '';
      }
      //console.log('val: ' + $scope.user.password);
      else {
        $scope.user.password += val;
      }
    };

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: 'admin',
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $location.path('/');
          $scope.errors.other = err.message;
        });
      }
    };

  });
