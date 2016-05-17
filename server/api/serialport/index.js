'use strict';

var express = require('express');
var app = require('../../app');
var server = app.server;
var io = require('socket.io').listen(server);
module.exports.socket = io;

var controller = require('./serialport.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
//router.put('/:id', controller.update);
router.put('/:id', controller.sent);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;