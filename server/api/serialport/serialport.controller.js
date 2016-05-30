'use strict';

var _ = require('lodash');
var xor = require('bitwise-xor');
var Serialport = require('./serialport.model');
var SerialPort = require('serialport').SerialPort;
var port = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  rtscts: false,
  xon: false,
  xoff: 'default',
  xany: 'default',
  bufferSize: 512
}, false);

var serialportsList;

function waitForDevice(callback) {
  setTimeout(callback, 3);
}
function waitForDeviceTime(callback,time) {
  setTimeout(callback, time);
}

function loadSerialportsList() {
  Serialport.find(function (err, serialports) {
    if (err) {
      return handleError(res, err);
    }
    return serialportsList = serialports.slice(0);
  });
}
var dataArray = [];
(function () {
  loadSerialportsList();

  // wascheinlich besser den port per funktion zu öffen und den entsprechende buffer zu übergeben
  port.open(function (err) {
    var modul = 0;
    var modulArray = [
      new Buffer([0x02, 0x01, 0x01, 0x00, 0x00, 0x05]),
      //new Buffer([0x02, 0x01, 0x01, 0x00, 0x00, 0x05]),
      //new Buffer([0x02, 0x01, 0x01, 0x00, 0x03, 0x05]), Modulname senden
      //new Buffer([0x02, 0x01, 0x01, 0x00, 0x04, 0x05]), // macht noch Fehler
      new Buffer([0x02, 0x01, 0x01, 0x00, 0x05, 0x05]),
      new Buffer([0x02, 0x01, 0x01, 0x00, 0x06, 0x05]),
      //new Buffer([0x02, 0x01, 0x01, 0x00, 0x07, 0x05]),
      //new Buffer([0x02, 0x01, 0x01, 0x00, 0x07, 0x05])
    ];

    var refreshIntervalId = setInterval(function () {
      if (err) {
        return console.log('Error opening port: ', err.message);
      }
      /*function getZaehlerstand(module){
       for(var modul in module){
       console.log(module[modul]);
       // 02 = start, 01 = modul, 01 = modul, 00 = länge der Datenbits bei anfrage immer 00, 00 = Zählerstände Senden, 05 = TYP Anfrage
       port.write(new Buffer([0x02, module[modul], 0x01, 0x00, 0x00, 0x05]));*/

      console.log('Write modul: ' + modul);
      loadSerialportsList();
      port.write(modulArray[modul]);

      modul++;
      if (modul >= modulArray.length) {
        modul = 0;
        //clearInterval(refreshIntervalId); // stoppt das Interfal
      }
    }, 5 * 1 * 1000); // sec * min * faktor*/
  });


  port.on('data', function (data) {
    //console.log('data received: ' + data.toString('hex'));

    var stringData = data.toString('hex');
    /*
     * var jsonData ist ein array also kann mit jsonData[0] auf die verschiedenen values zugegriffen werden.
     */
    //var jsonData = data.readInt8(0);
    var jsonData = stringData.match(/.{1,2}/g);
    //console.log('jsonData: ' + jsonData);

    var key, count = 0;
    for (key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        dataArray.push(jsonData[count]);
        count++;
      }
    }
    if (dataArray[0] !== '02'){
      console.log('einzelnes kommando');
      console.log(dataArray[0]);
      //port.write( new Buffer(0x03));

      if(dataArray[0] === '06'){
        waitForDevice(function() {
          port.write( new Buffer('05', 'hex'));
          console.log(new Buffer('05', 'hex').toString('hex'));
        });
      }
      dataArray.splice(0, dataArray.length);
    }
    if (dataArray[parseInt(dataArray[2])] !== undefined) {
      //console.log('count: ' + count);
      //console.log('Dataarray: ' + (parseInt(dataArray[2])));
      //console.log('Dataarray +5 : ' + (parseInt(dataArray[2]) + 5));
      //console.log('Dataarray: ' + dataArray[parseInt(dataArray[2])+5]);
      if (dataArray[parseInt(dataArray[2]) + 5] !== undefined) {
        console.log('Dataarraylen: ' + dataArray);
        //console.log('MSB 0: ' + parseInt((dataArray[5][0]),16).toString(2));
        //console.log('MSB 1: ' + parseInt((dataArray[5][1]),16).toString(2));
        //console.log('MSB ' + parseInt((dataArray[5]),16).toString(2));
        //console.log('LSB 0: ' + parseInt((dataArray[4][0]),16).toString(2));
        //console.log('LSB 1: ' + parseInt((dataArray[4][1]),16).toString(2));
        //console.log('LSB ' + parseInt((dataArray[4]),16).toString(2));
        //console.log('############# True #############');
        //dataArray.splice(0,dataArray.length);
      }
      if (dataArray[parseInt(dataArray[2]) + 5] !== undefined) {

        console.log('Write 03 EMPFANGSBESTÄTIGUNG'); // EMPFANGSBESTÄTIGUNG SEHR WICHTIG
        port.write( new Buffer(0x03)); //Bestätigung schicken das die Daten angekommen sind
        var newThing = {};
        newThing.modul = dataArray[1];
        newThing.type = dataArray[3];
        newThing.value = {};
        newThing.value = dataArray.slice(0); // Copy the Array
        var res;
        dataArray.splice(0, dataArray.length); // empty array
        if(newThing.value[0] === '02') {
          //console.log('serialportsList ' + serialportsList);
          var _modul = false;
          console.log('newthing: '+ newThing.modul);
          for (key in serialportsList) {
            //console.log('newThing Modul: ' + newThing.modul + ' ' + 'Modul :' + serialportsList[key].modul);
            //console.log('SerialPort: ' + serialportsList[key].modul);
            if (serialportsList[key].modul == newThing.modul && serialportsList[key].type == newThing.type) {
              //console.log("########_modul = true####################");
              _modul = true;
              Serialport.findById(serialportsList[key]._id, {upsert: true}, function (err, serialport) {
                if (err) {
                  return handleError(res, err);
                }
                var updated = _.merge(serialport, newThing);
                updated.save(function (err) {
                  if (err) {
                    return handleError(res, err);
                  }
                  return serialport;
                });
              });

              return null;
            }
          }
        }
        if (_modul == false) {
          console.log("########Create####################");
          Serialport.create(newThing, function (err, serialport) {
            if (err) {
              return handleError(res, err);
            }
            return null;
          });
        }
      }
    }
  });
})();

// Creates a new serialport in the DB.
exports.sent = function (req, res) {

  if (req.body.type !== undefined) {
    if (req.body.device === undefined) {
      req.body.device = 3;
    }
    if (req.body.modul === undefined) {
      req.body.modul = 1;
    }
    console.log(req.body);

    var xorBuffer = function (buffer) {
      buffer.toJSON();
      var value = buffer.slice(0);
      var xorVar = new Buffer('0' + value[1], 'hex');
      for (var val = 1; val < buffer.length - 2; val++) {
        xorVar = xor(new Buffer(xorVar), new Buffer('0' + value[val + 1], 'hex'));
      }
      value[value.length - 1] = xorVar.toString('hex');
      buffer = new Buffer(value, 'hex');
      return buffer;
    };
    console.log("test ampere_is "+ req.body.ampere_is);
    console.log("test ampere_target " + req.body.ampere_target);
    var buffer = new Buffer([0x02, 0x0 + req.body.modul, 0x0 + req.body.modul, 0x02, 0x00, 0x0 + req.body.device, 0x0 + req.body.type, 0x03, 0x00]);
    buffer = xorBuffer(buffer);
    if(req.body.ampere_is == 1) {
      console.log("test ampere_is");
      buffer = new Buffer([0x02, 0x01, 0x01, 0x00, 0x01, 0x05]);
    } if(req.body.ampere_target == 1) {
      console.log("test ampere_target");
      buffer = new Buffer([0x02, 0x01, 0x01, 0x00, 0x02, 0x05]);
    }
    port.write(buffer);
  }
  return res.status(200).json();
};

// Get list of serialports
exports.index = function (req, res) {
  Serialport.find(function (err, serialports) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(serialports);
  });
};

// Get a single serialport
exports.show = function (req, res) {
  Serialport.findById(req.params.id, function (err, serialport) {
    if (err) {
      return handleError(res, err);
    }
    if (!serialport) {
      return res.status(404).send('Not Found');
    }
    return res.json(serialport);
  });
};

// Creates a new serialport in the DB.
exports.create = function (req, res) {
  /*Serialport.create(req.body, function (err, serialport) {
    if (err) {
      return handleError(res, err);
    }*/
  return res.status(201).json();
  //);
};

// Updates an existing serialport in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Serialport.findById(req.params.id, function (err, serialport) {
    if (err) {
      return handleError(res, err);
    }
    if (!serialport) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(serialport, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(serialport);
    });
  });
};

// Deletes a serialport from the DB.
exports.destroy = function (req, res) {
  Serialport.findById(req.params.id, function (err, serialport) {
    if (err) {
      return handleError(res, err);
    }
    if (!serialport) {
      return res.status(404).send('Not Found');
    }
    serialport.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}