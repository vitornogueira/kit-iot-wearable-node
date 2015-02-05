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

//Return the 3 axis of the accelerometer
kit.on('data:accelerometer', function () {
  console.log(kit.data.accelerometer);
});

//Return only the x axis
kit.on('data:accelerometer-x', function (data) {
  console.log(data);
});
