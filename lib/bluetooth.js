var events = require('events'),
    cmd    = require('./commands'),
    util   = require('util'),
    _      = require('underscore'),
    bluetooth = require('bluetooth-serial-port'),
    serial = new bluetooth.BluetoothSerialPort();

/**
 * @class
 * @classdesc Creates an instance of the Wearable object
 * @extends external:events.EventEmitter
 * @param config {object} - optional configuration object.
 * @param config.name {string} - optional name of the wearable to connect.
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

util.inherits(Wearable, events.EventEmitter);


/**
 * Discover wearable kits.
 * @param callback {function} - Callback that will return the infomation about the wearables founded.
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

  serial.inquire();
};

/**
 * Connect to a wearable kit.
 * @param info {object} - object that contains address and name of the wearable.
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
 */
Wearable.prototype.ledOFF = function () {
  this.sendCommand(cmd.LED.RED.LOW);
  this.sendCommand(cmd.LED.GREEN.LOW);
  this.sendCommand(cmd.LED.BLUE.LOW);
};

/**
 * Trun on LED.
 * @param color {string} - color of the led to turn on
 * @param value {number} - optional value of the intensity for the led (0 to 255)
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
 * Is connected to the wearable.
 * @returns {boolean}
 */
Wearable.prototype.isConnected = function () {
  return serial.isOpen();
};


module.exports = Wearable;

