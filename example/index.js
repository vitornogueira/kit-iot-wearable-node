var Wearable = require('../lib/wearable.js'),
    kit = new Wearable({
      name: 'wV3_0E003976'
    });

//Find for the kit
kit.findWearable();

//After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");
  kit.ledON();

  setTimeout(function () {
    kit.ledON('BLUE');
  }, 2000);
});

//On disconnect
kit.on('disconnected', function () {
  console.log('Bye!');
});

//On data button 1
kit.on('data:button1', function (data) {
  if (data) {
    kit.getTemperature();
  }
});

//On data button 2
kit.on('data:button2', function (data) {
  if (data) {
    kit.getLuminosity();
  }
});

//On any data change
kit.on('data', function () {
  console.log(kit.data);
});
