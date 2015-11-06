'use strict';

describe('Controller: CommuterCtrl', function () {

  // load the controller's module
  beforeEach(module('infoSystemApp'));

  var CommuterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommuterCtrl = $controller('CommuterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
