var events = require('events'),
    cmd    = require('./commands'),
    util   = require('util'),
    _      = require('underscore'),
    bluetooth = require('bluetooth-serial-port'),
    serial = new bluetooth.BluetoothSerialPort();

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
 * Discover wearable kits.
 * @param callback {callback} - callback that will return the infomation about the wearables.
 * @example
 * ```js
 * ...
 *
 * kit.discover(function (info) {
 *   //information about the wearable, 'name' and 'address' needed for connect
 *   console.log(info);
 * });
 * ```
 */
Wearable.prototype.discover = function (callback) {
  var _this = this;

  serial.on('found', function (address, name) {
    callback({
      address: address,
      name: name
    });
  });

  serial.on('close', function () {
    _this.disconnect();
    _this.emit('disconnected');
  });

  serial.on('data', function (data) {
    _this.onData(data);
  });

  serial.on('failure', function(err) {
    _this.emit('error', err);
  });

  //start the search for the wearables
  serial.inquire();
};

/**
 * Connect to a wearable kit.
 * @param info {object} - object that contains "address" and "name" of the wearable.
 * @param info.address {string} - address of the wearable.
 * @param info.name {string} - name of the wearable.
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
Wearable.prototype.connect = function (info) {
  var _this = this;

  if (info.name === this.name) {
    //Find the channel for the wearable address
    serial.findSerialPortChannel(info.address, function successFindChannel(channel) {
      //Connect to the wearable address channel
      serial.connect(info.address, channel, function successConnect() {
        _this.emit('connected');

      }, function errorConnect(err) {
        _this.emit('error', err);
      });

    }, function errorFindChannel() {
      _this.emit('error', 'Could not find channel of "' + info.name + '"');
    });

  } else {
    _this.emit('error', 'No wearable founded');
    _this.disconnect();
  }
};

/**
 * Disconnect the wearable kit.
 * @example
 * ```js
 * ...
 *
 * kit.discover(function (info) {
 *   kit.connect(info);
 *
 *   kit.on('connected', function () {
 *     kit.disconnect();
 *   });
 *
 *   //after disconnect the 'disconnected' event will be emitted
 *   kit.on('disconnected', function () {
 *     console.log('Disconnected from wearable');
 *   });
 * });
 * ```
 */
Wearable.prototype.disconnect = function () {
  serial.close();
};

/**
 * Send command to the wearable.
 * @param command {string} - command to send to the wearable.
 */
Wearable.prototype.sendCommand = function (command) {
  var _this = this;

  //Send the commad as buffer, the commadn should end with a "\n"
  serial.write(new Buffer(command, 'utf-8'), function (err) {
    if (err) {
      _this.emit('error', err);
    }
  });
};

/**
 * On data receive from wearable.
 * @param data {string} - string received from the wearable.
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
 */
Wearable.prototype.ledON = function (color, value) {
  var colors = ['RED', 'GREEN', 'BLUE'],
      color = (color) ? color.toUpperCase() : 'GREEN',
      command;

  if (colors.indexOf(color) !== -1) {
    command = (value) ? cmd.LED[color].CUSTOM(value) : cmd.LED[color].HIGH;

  } else {
    command = (value) ? cmd.LED['GREEN'].CUSTOM(value) : cmd.LED['GREEN'].HIGH;
  }

  this.ledOff();
  this.sendCommand(command);
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

