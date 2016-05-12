'use strict';

angular.module('infoSystemApp')
  .factory('Modal', function ($rootScope, $modal) {
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
         * Create a function to open a accept confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} acc - callback, ran when accept is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        accept: function(acc) {
          acc = acc || angular.noop;

          /**
           * Open a accept confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                arg = args.shift(),
                acceptModal;

                var modalClass;
                if (arg.power == true) { modalClass = 'modal-success' }
                if (arg.power != true) { modalClass = 'modal-off' }
                if (arg.error_code >= 0) { modalClass = 'modal-danger' }
                if (arg.service_code >= 0) { modalClass = 'modal-warning' }

            acceptModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm',
                html: '<p>Are you sure you want <strong>' + arg + '</strong> this ?</p>',
                buttons: [{
                  classes: 'btn-success',
                  text: 'OK',
                  click: function(e) {
                    acceptModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    acceptModal.dismiss(e);
                  }
                }]
              }
            }, modalClass);

            acceptModal.result.then(function(event) {
              acc.apply(event, args);
            });
          };
        },

        service: function(service) {
          service = service || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              arg = args.shift(),
              serviceModal;

            serviceModal = openModal({
              modal: {
                dismissable: true,
                serviceview: true,
                title: 'Service Einstellungen',
                buttons: [{
                  classes: 'btn-default',
                  text: 'OK',
                  click: function(e) {
                    serviceModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-off');

            serviceModal.result.then(function(event) {
              service.apply(event, args);
            });
          };
        },

        login: function(login) {
          login = login || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              arg = args.shift(),
              loginModal;

            loginModal = openModal({
              modal: {
                dismissable: true,
                title: 'Login',
                html: "<div ng-include='/app/account/login/login.html'></div>",
                showLogin: true,
                buttons: [{
                  classes: 'btn-success',
                  text: 'Close',
                  click: function(e) {
                    loginModal.close(e);
                  }
                }]
              }
            }, 'modal-off');

            loginModal.result.then(function(event) {
              login.apply(event, args);
            });
          };
        },
        error: function(error) {
          error = error || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              arg = args.shift(),
              errorModal;

            errorModal = openModal({
              modal: {
                dismissable: true,
                title: 'Alarme',
                arg : arg,
                errorview: true,
                buttons: [{
                  classes: 'btn-default',
                  text: 'OK',
                  click: function(e) {
                    errorModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            errorModal.result.then(function(event) {
              error.apply(event, args);
            });
          };
        },
      }
    };
  });
