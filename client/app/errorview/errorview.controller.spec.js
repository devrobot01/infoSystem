'use strict';

describe('Controller: ErrorviewCtrl', function () {

  // load the controller's module
  beforeEach(module('infoSystemApp'));

  var ErrorviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ErrorviewCtrl = $controller('ErrorviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
