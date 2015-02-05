var Wearable = require('../lib/wearable'),
    kit = new Wearable({
      name: 'wV3_0E0039AF'
    });

//Find for the kit
kit.findWearable();

//After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");
  kit.ledON();

  setInterval(function () {
    kit.accelerometer();
  }, 200);
});

//On disconnect
kit.on('disconnected', function () {
  console.log('Bye!');
});

kit.on('data:accelerometer', function () {
  console.log(kit.data.accelerometer);
});
