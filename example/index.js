var Wearable = require('../lib/wearable.js'),
    kit = new Wearable({
      name: 'wV3_0E003976'
    });

kit.findWearable();

kit.on('connected', function () {
  console.log("Connected to the kit");
  kit.ledON();

  setTimeout(function () {
    kit.ledOFF();
  }, 1000);

  setTimeout(function () {
    kit.ledON('BLUE');
  }, 2000);

  setTimeout(function () {
    kit.ledON('GREEN');
  }, 3000);
});

kit.on('data', function (data) {
  console.log(data);
});
