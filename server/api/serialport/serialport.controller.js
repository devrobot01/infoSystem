'use strict';

var _ = require('lodash');
var Serialport = require('./serialport.model');

// Get list of serialports
exports.index = function(req, res) {
  Serialport.find(function (err, serialports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(serialports);
  });
};

// Get a single serialport
exports.show = function(req, res) {
  Serialport.findById(req.params.id, function (err, serialport) {
    if(err) { return handleError(res, err); }
    if(!serialport) { return res.status(404).send('Not Found'); }
    return res.json(serialport);
  });
};

// Creates a new serialport in the DB.
exports.create = function(req, res) {
  Serialport.create(req.body, function(err, serialport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(serialport);
  });
};

// Updates an existing serialport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Serialport.findById(req.params.id, function (err, serialport) {
    if (err) { return handleError(res, err); }
    if(!serialport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(serialport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(serialport);
    });
  });
};

// Deletes a serialport from the DB.
exports.destroy = function(req, res) {
  Serialport.findById(req.params.id, function (err, serialport) {
    if(err) { return handleError(res, err); }
    if(!serialport) { return res.status(404).send('Not Found'); }
    serialport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}