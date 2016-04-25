/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Serialport = require('./serialport.model');

exports.register = function(socket) {
  Serialport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Serialport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('serialport:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('serialport:remove', doc);
}