'use strict';

angular.module('infoSystemApp')
  .service('Sent', function ($resource) {
    return $resource('/api/serialports/:id', {
        id: '@_id'
      },
      {
        sentVal: {
          method: 'PUT',
          params: {
            //controller:'sent'
            id: '01'
          }
        },
        get: {
          method: 'GET',
          params: {
            id:'me'
          }
        }
      });
  });