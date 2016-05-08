'use strict';

describe('Controller: ServiceviewCtrl', function () {

  // load the controller's module
  beforeEach(module('infoSystemApp'));

  var ServiceviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceviewCtrl = $controller('ServiceviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
