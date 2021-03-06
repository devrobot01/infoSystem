'use strict';

angular.module('infoSystemApp')
  .factory('Modal', function ($rootScope, $modal, Auth) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        change: function(device) {
          if (Auth.isLoggedIn()) {
            device = device || angular.noop;

            /**
             * Open a delete confirmation modal
             * @param  {String} name   - name or info to show on modal
             * @param  {All}           - any additional args are passed straight to del callback
             */
            return function () {
              var args = Array.prototype.slice.call(arguments),
                  deviceopt = args.shift(),
                  changeModal;

              var modal_header;
              if (deviceopt.power == true) {
                modal_header = 'modal-success'
              }
              if (deviceopt.power != true) {
                modal_header = 'modal-off'
              }
              if (deviceopt.error_code >= 0) {
                modal_header = 'modal-danger'
              }
              if (deviceopt.service_code >= 0) {
                modal_header = 'modal-warning'
              }
              //else {modal_header = 'modal-info'}

              changeModal = openModal({
                modal: {
                  dismissable: true,
                  title: 'Change Settings',
                  html: '<p>Reset lamp meter ?</p>',
                  buttons: [{
                    classes: 'btn-primary',
                    text: 'OK',
                    click: function (e) {
                      changeModal.close(e);
                    }
                  }, {
                    classes: 'btn-default',
                    text: 'Cancel',
                    click: function (e) {
                      changeModal.dismiss(e);
                    }
                  }]
                }
              }, modal_header);

              changeModal.result.then(function (event) {
                device.apply(event, args);
              });
            };
          }
        }
      }
    };
  });
