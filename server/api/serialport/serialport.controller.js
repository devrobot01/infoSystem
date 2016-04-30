'use strict';

var _ = require('lodash');
var Serialport = require('./serialport.model');
var module = [0x01,0x02,0x03,0x04,0x05,0x06,0x07];
var SerialPort = require('serialport').SerialPort;
var port = new SerialPort("/dev/ttyUSB0", { baudrate: 9600 },false);

var response = {
  STX:'', // Start Zeichen 02
  ADR:'', // Modul Adresse 01
  LEN:'', // Anzahl Datenbytes 06
  TYP:'', // Daten Typ 00
  DAT1:'',// Datenbyte 1 0427
  DAT2:'',// Datenbyte 2 0427
  DAT3:'',// Datenbyte 3 0327
  ETX:'', // Ende Zeichen 03
  BCC:''  // Checksumme 20
};

var serialportsList;

function loadList() {
  Serialport.find(function (err, serialports) {
    if (err) { return handleError(res, err); }
    return serialportsList = serialports.slice(0);
  });
}

(function (){
  loadList();
  port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
    /*function getZaehlerstand(module){
      for(var modul in module){
        console.log(module[modul]);
        // 02 = start, 01 = modul, 01 = modul, 00 = länge der Datenbits bei anfrage immer 00, 00 = Zählerstände Senden, 05 = TYP Anfrage
        port.write(new Buffer([0x02, module[modul], 0x01, 0x00, 0x00, 0x05]));
      }
    }

    getZaehlerstand(module);*/
    setInterval(function(){
      console.log('ask for count');
      port.write(new Buffer([0x02, 0x01, 0x01, 0x00, 0x00, 0x05]));
      var dataArray = [];

      port.on('data', function(data) {
        //console.log('data received: ' + data.toString('hex'));
        var stringData = data.toString('hex');
        /*
         * var jsonData ist ein array also kann mit jsonData[0] auf die verschiedenen values zugegriffen werden.
         */
        var jsonData = stringData.match(/.{1,2}/g);
        //console.log('jsonData: ' + jsonData);

        var key, count = 0;
        for(key in jsonData) {
          if(jsonData.hasOwnProperty(key)) {
            dataArray.push(jsonData[count]);
            count++;
          }
        }
        //console.log('count: ' + count);
        // console.log(response);

        if(dataArray[11] != null && dataArray[12] == null) {
          //console.log('Data: ' + dataArray);
          var newThing = {};
          newThing.modul = dataArray[1];
          newThing.type = dataArray[3];
          newThing.value = dataArray;
          var res;

          loadList();
          var _modul = false;
          for(key in serialportsList) {
            console.log(serialportsList[key].modul);
            if (serialportsList[key].modul == newThing.modul){
              Serialport.findById(serialportsList[key]._id, function (err, serialport) {
                if (err) { return handleError(res, err); }
                var updated = _.merge(serialport, newThing);
                updated.save(function (err) {
                  if (err) { return handleError(res, err); }
                  return serialport;
                });
              });
              return _modul = serialportsList[key].modul;
            }
          }
          //console.log(_modul);
          //console.log(serialportsList);
          if(_modul == false) {
            /*Serialport.create(newThing, function(err, serialport) {
             if(err) { return handleError(res, err); }
             return null;
             });*/
            console.log('create: ');
          }
        }
      });
      return;
    }, 5 * 1 * 1000); // sec * min * faktor


  });





  /*port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
    // errors will be emitted on the port since there is no callback to write
    // 02 = start, 01 = modul, 01 = modul, 00 = länge der Datenbits bei anfrage immer 00, 00 = Zählerstände Senden, 05 = TYP Anfrage
    port.write(new Buffer([0x02, 0x01, 0x01, 0x00, 0x00, 0x05]));
    // new Buffer("250001000192CD0000002F6D6E742F72", "hex") auch möglich
  });

  port.on('data', function(data) {
    console.log('data received: ' + data.toString('hex'));
  });*/
})();

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