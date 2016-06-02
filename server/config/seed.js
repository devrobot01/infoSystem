/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Serialport = require('../api/serialport/serialport.model');
var User = require('../api/user/user.model');

Serialport.find({}).remove(function() {
  console.log('Serialports deleted');
});
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin',
    password: '582'
  }, function() {
      console.log('finished populating users');

    }
  );
});

