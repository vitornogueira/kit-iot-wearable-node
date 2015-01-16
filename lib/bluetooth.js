var events    = require('events'),
    cmd       = require('./commands'),
    util      = require('util'),
    _         = require('underscore'),
    helpers   = require('./helpers'),
    bluetooth = require('bluetooth-serial-port'),
    serial    = new bluetooth.BluetoothSerialPort();

/**
 * Creates an instance of the Wearable object
 * @class
 * @param config {object} - OPTIONAL configuration object.
 * @param config.name {string} - OPTIONAL (default is wearable) name of the wearable to connect.
 * @extends EventEmitter
 * @fires connected - will be emitted when connect to a wearable
 * @fires disconnected - will be emitted if the wearable disconnect
 * @fires error - will be emitted if any error occur
 * @example
 * ```js
 * var Wearable = require('kit-iot-wearable'),
 *     kit = new Wearable();
 *
 * //or pass a object with a param name to specify a wearable name
 * var Wearable = require('kit-iot-wearable'),
 *     kit = new Wearable({
 *       name: 'name-of-your-wearable'
 *     });
 * ```
 */
var Wearable = function (config) {
  'use strict';

  //If is not instance of Wearable return a new instance
  if (false === (this instanceof Wearable)) {
    return new Wearable();
  }

  events.EventEmitter.call(this);

  this.defaults = {
    name: 'wearable'
  };

  _.extend(this.defaults, config);

  this.name = this.defaults.name;
  this.devices = [];
};


/**
 * Nodejs EventEmitter.
 * @external EventEmitter
 * @see {@link http://nodejs.org/api/events.html#events_class_events_eventemitter}
 */
/**
 * Connected event will be fired when connect to a wearable.
 * @event connected
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   console.log('Wearable is Conected!');
 * });
 * ```
 */
/**
 * Error event will be fired when any error occur.
 * @event error
 * @type {string}
 * @example
 * ```js
 * ...
 *
 * kit.on('error', function (err) {
 *   console.log(err);
 * });
 * ```
 */
/**
 * Disconnected event will be fired when disconnect form a wearable.
 * @event disconnected
 * @example
 * ```js
 * ...
 *
 * kit.on('disconnected', function () {
 *   console.log('Disconnected from wearable');
 * });
 * ```
 */
util.inherits(Wearable, events.EventEmitter);


/**
 * Find wearable kit.
 * @param callback {callback} - callback that will return the infomation about the wearables.
 * @example
 * ```js
 * ...
 *
 * //Start looking for the wearable
 * kit.findWearable();
 * ```
 */
Wearable.prototype.findWearable = function () {
  var _this = this,
      regex = /wearable/i;

  serial.on('found', function (address, name) {
    var device = {
      address: address,
      name   : name
    };

    if (regex.test(name)) {
      _this.devices.push(device);

      helpers.log('Try to connect to '+ device.name, true);
      _this.connect();
    }
  });

  //When finish looking for a device
  serial.on('finished', function () {
    helpers.log('finished');

    if (_this.devices) {
      _this.emit('found');

    } else {
      _this.emit('error', 'Could not find the device "'+ _this.name +'"');
    }
  });

  //On close disconnect
  serial.on('close', function () {
    _this.disconnect();
  });

  //When receive data
  serial.on('data', function (data) {
    _this.onData(data);
  });

  //On any failure
  serial.on('failure', function (err) {
    _this.emit('error', err);
  });

  //start the search for the wearables
  helpers.log('Searching for device "'+ this.name +'"', true);
  serial.inquire();
};


/**
 * Connect to a wearable kit.
 * @param device {object} - object with device information.
 * @param device.address {string} - address of the wearable.
 * @param device.name {string} - name of the wearable.
 * @example
 * ```js
 * ...
 *
 * kit.discover(function (info) {
 *   //pass the info object from the discover callback
 *   kit.connect(info);
 *
 *   //after connection the 'connected' event will be emitted
 *   kit.on('connected', function () {
 *     console.log('Wearable is Conected!');
 *   });
 * });
 * ```
 */
Wearable.prototype.connect = function () {
  var _this  = this,
      device = _.find(this.devices, function (item) {
        return item.name === _this.name;
      });

  if (device) {
    helpers.log('Get the "'+ device.name + '" channel');

    //Find the channel for the wearable address
    serial.findSerialPortChannel(device.address, function successFindChannel(channel) {
      helpers.log(_this.name + ' channel is : ' + channel);

      //Connect to the wearable address channel
      serial.connect(device.address, channel, function successConnect() {
        _this.emit('connected');

      }, function errorConnect(err) {
        _this.emit('error', err);
      });

    }, function errorFindChannel() {
      _this.emit('error', 'Could not find channel of "' + device.name + '"');
    });
  }
};


/**
 * Disconnect the wearable kit.
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.disconnect();
 * });
 *
 * //after disconnect the 'disconnected' event will be emitted
 * kit.on('disconnected', function () {
 *   console.log('Disconnected from wearable');
 * });
 * ```
 */
Wearable.prototype.disconnect = function () {
  this.emit('disconnected');
  serial.close();
};


/**
 * Send command to the wearable.
 * @param command {string} - command to send to the wearable.
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   //send the command to read the luminosity sensor
 *   kit.sendCommand('#LI0000');
 * });
 * ```
 */
Wearable.prototype.sendCommand = function (command) {
  var _this = this;

  helpers.log(command);

  //Send the commad as buffer, the commadn should end with a "\n"
  serial.write(new Buffer(command + '\n', 'utf-8'), function (err) {
    if (err) {
      _this.emit('error', err);
    }
  });
};


/**
 * On data receive from wearable.
 * @param data {string} - string received from the wearable.
 * @ignore
 */
Wearable.prototype.onData = function (data) {
  var buf = new Buffer(data);
  this.emit('data', buf.toString('utf-8'));
};


/**
 * Trun off LED.
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.ledOFF();
 * });
 * ```
 */
Wearable.prototype.ledOFF = function () {
  this.sendCommand(cmd.LED.RED.LOW);
  this.sendCommand(cmd.LED.GREEN.LOW);
  this.sendCommand(cmd.LED.BLUE.LOW);
};


/**
 * Trun on LED.
 * @param color {string} - OPTIONAL (default is GREEN) color of the led to turn on
 * @param value {number} - OPTIONAL value of the intensity for the led (0 to 255)
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.ledON(); //turn on the GREEN led by default
 *   kit.ledON('GREEN'); //turn on the GREEN led
 *   kit.ledON('RED'); //turn on the RED led
 *   kit.ledON('BLUE'); //turn on the BLUE led
 * });
 * ```
 */
Wearable.prototype.ledON = function (color, value) {
  var colors = ['RED', 'GREEN', 'BLUE'],
      rgb = (color) ? color.toUpperCase() : 'GREEN',
      command;

  if (colors.indexOf(rgb) !== -1) {
    command = (value) ? cmd.LED[rgb].CUSTOM(value) : cmd.LED[rgb].HIGH;

  } else {
    command = (value) ? cmd.LED.GREEN.CUSTOM(value) : cmd.LED.GREEN.HIGH;
  }

  this.ledOFF();
  this.sendCommand(command);
};


/**
 * Play music.
 * @param music {string} - OPTIONAL (default is FIRST)
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.playMusic(); //play the MARIO music
 *   kit.playMusic('CHRISTMAS'); //play the CHRISTMAS music
 * });
 * ```
 */
Wearable.prototype.playMusic = function (music) {
  var musics = ['CHRISTMAS', 'MARIO'],
      chosen = (musics.indexOf(music.toUpperCase()) !== -1) ? music.toUpperCase() : musics[1];

  this.sendCommand(cmd.MUSIC[chosen]);
};


/**
 * Check if have any wearable connected.
 * @returns {boolean}
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   console.log(kit.isConnected());
 * });
 * ```
 */
Wearable.prototype.isConnected = function () {
  return serial.isOpen();
};


module.exports = Wearable;

