var helpers = require('./helpers');

//Accelerometer
var ACCELEROMETER = {
  X: '#AC0000',
  Y: '#AC0001',
  Z: '#AC0002'
};

//Led RGB
var LED = {
  RED: {
    HIGH  : '#LR0255',
    LOW   : '#LR0000',
    CUSTOM: function (value) {
      return '#LR0' + helpers.checkValue(value);
    }
  },
  GREEN: {
    HIGH  : '#LG0255',
    LOW   : '#LG0000',
    CUSTOM: function (value) {
      return '#LG0' +  helpers.checkValue(value);
    }
  },
  BLUE: {
    HIGH  : '#LB0255',
    LOW   : '#LB0000',
    CUSTOM: function (value) {
      return '#LB0' +  helpers.checkValue(value);
    }
  }
};


module.exports = {
  ACCELEROMETER: ACCELEROMETER,
  LED: LED
};
