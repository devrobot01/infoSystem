'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SerialportSchema = new Schema({
  modul: String,
  type: String,
  value: Array
});

module.exports = mongoose.model('Serialport', SerialportSchema);