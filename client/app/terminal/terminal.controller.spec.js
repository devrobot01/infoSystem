'use strict';

describe('Controller: TerminalCtrl', function () {

  // load the controller's module
  beforeEach(module('infoSystemApp'));

  var TerminalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TerminalCtrl = $controller('TerminalCtrl', {
      $scope: scope

    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
