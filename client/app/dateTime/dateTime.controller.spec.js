'use strict';

describe('Controller: DateTimeCtrl', function () {

  // load the controller's module
  beforeEach(module('infoSystemApp'));

  var DateTimeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DateTimeCtrl = $controller('DateTimeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
