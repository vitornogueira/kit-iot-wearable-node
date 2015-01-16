var _ = require('underscore');

var checkValue = function (val) {
    var min = 0,
        max = 255,
        parsedVal = parseFloat(val);

    //Return 255 if is not a number or if is more then the max value
    if (_.isNaN(parsedVal) || parsedVal > max) {
      return 255;
    }

    //Return 0 if is less the min number
    if (parsedVal < min) {
      return  0;
    }

    return val;
};

/**
 * Console log helper.
 */
var log = function (message, header, showLog) {
  var print = (showLog) ? showLog : true;

  if (print) {
    if (header) {
      console.log('--------------------');
      console.log(message);
      console.log('--------------------');
    } else {
      console.log(message);
    }
  }
};


module.exports = {
  checkValue: checkValue,
  log: log
};
