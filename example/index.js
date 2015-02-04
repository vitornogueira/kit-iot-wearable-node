var Wearable = require('kit-iot-wearable'),
    kit = new Wearable({
      name: 'wV3_0B003970'
    });

//Find for the kit
kit.findWearable();

//After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");

  setInterval(function () {
    kit.temperature();
    kit.luminosity();
    kit.playMelody();
  }, 2000);
});

//On disconnect
kit.on('disconnected', function () {
  console.log('Bye!');
});

//On distance
kit.on('data:distance', function (data) {
  console.log('distance is %s', data);
});

//On data button 1
kit.on('data:button1', function (data) {
  if (data) {
    kit.playMelody();
  }
});

//On data button 2
kit.on('data:button2', function (data) {
  if (data) {
    kit.ledON('RED');
  }
});

//On any data change
kit.on('data', function () {
  console.log(kit.data);
});
