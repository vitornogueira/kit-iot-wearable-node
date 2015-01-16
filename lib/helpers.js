var _ = require('underscore');

/**
 * Check if the value is between the range of 0 to 255.
 * @param {number} message - the message that will be logged.
 * @returns {number}
 */
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

    return parsedVal;
};

/**
 * Console log helper.
 * @param {string} message - the message that will be logged.
 * @param {boolean} header - OPTIONAL (default is false) if it should be printed as a header.
 * @param {boolean} showLog - OPTIONAL (default is true) if it should log.
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
