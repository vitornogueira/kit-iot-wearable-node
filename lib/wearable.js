var events    = require('events'),
    cmd       = require('./commands'),
    util      = require('util'),
    _         = require('underscore'),
    helpers   = require('./helpers'),
    bluetooth = require('bluetooth-serial-port'),
    serial    = new bluetooth.BluetoothSerialPort();

/**
 * Creates an instance of the Wearable object.
 * @class
 * @param config {object} - OPTIONAL configuration object.
 * @param config.name {string} - OPTIONAL (default is wearable) name of the wearable to connect.
 * @extends EventEmitter
 * @fires connected - will be emitted when connect to a wearable.
 * @fires disconnected - will be emitted if the wearable disconnect.
 * @fires error - will be emitted if any error occur.
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
    name: 'wV3'
  };

  _.extend(this.defaults, config);

  this.name = this.defaults.name;
  this.devices = [];

  return this;
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
 * Look for the wearable kit.
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
      regex = /wV3/i;

  this.disconnect();

  serial.on('found', function (address, name) {
    var device = {
      address: address,
      name   : name
    };

    if (regex.test(name)) {
      _this.devices.push(device);

      helpers.log('Try to connect to "'+ device.name + '"', true);
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

  return this;
};


/**
 * Connect to a wearable kit. This method is executed during
 * the findWearable method.
 * @param device {object} - object with device information.
 * @param device.address {string} - address of the wearable.
 * @param device.name {string} - name of the wearable.
 * @fires connected - will be emitted when connect to a wearable.
 * @example
 * ```js
 * ...
 *
 * kit.connect({
 *   name   : 'wearable',
 *   address: '30-14-08-26-24-39'
 * });
 *
 * //after connect the 'connected' event will be emitted
 * kit.on('connected', function () {
 *   kit.ledON('RED');
 *   kit.playMusic();
 * });
 * ```
 */
Wearable.prototype.connect = function () {
  var _this  = this,
      device = _.find(this.devices, function (item) {
        return item.name === _this.name;
      });

  if (device) {
    //Connect to the wearable
    serial.connect(device.address, 1, function successConnect() {
      _this.emit('connected');

    }, function errorConnect(err) {
      _this.emit('error', err);
    });
  }

  return this;
};


/**
 * Disconnect the wearable kit.
 * @fires disconnected - will be emitted if the wearable disconnect.
 * @example
 *
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

  return this;
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

  //Send the commad as buffer, the commadn should end with a "\n"
  serial.write(new Buffer(command + '\n', 'utf-8'), function (err) {
    if (err) {
      _this.emit('error', err);
    }
  });

  return this;
};


/**
 * On data receive from wearable.
 * @param data {string} - string received from the wearable.
 * @ignore
 */
Wearable.prototype.onData = function (data) {
  var buf = new Buffer(data);
  this.emit('data', buf.toString('utf-8'));

  return this;
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

  return this;
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

  return this;
};


/**
 * Play music.
 * @param music {string} - OPTIONAL (default is MARIO)
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
      chosen = (musics.indexOf(music) !== -1) ? music : musics[1];

  this.sendCommand(cmd.MUSIC[chosen].toUpperCase());

  return this;
};


/**
 * Get luminosity value.
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.getLuminosity();
 * });
 * ```
 */
Wearable.prototype.getLuminosity = function () {
  this.sendCommand(cmd.LUMINOSITY);

  return this;
};


/**
 * Get temperature value.
 * @example
 * ```js
 * ...
 *
 * kit.on('connected', function () {
 *   kit.getTemperature();
 * });
 * ```
 */
Wearable.prototype.getTemperature = function () {
  this.sendCommand(cmd.TEMPERATURE);

  return this;
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

