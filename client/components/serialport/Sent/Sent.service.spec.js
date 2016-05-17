'use strict';

describe('Service: Sent', function () {

  // load the service's module
  beforeEach(module('infoSystemApp'));

  // instantiate service
  var Sent;
  beforeEach(inject(function (_Sent_) {
    Sent = _Sent_;
  }));

  it('should do something', function () {
    expect(!!Sent).toBe(true);
  });

});
