var Wearable = require('kit-iot-wearable'),
    kit = new Wearable({
      name: 'wV3_0B0039AF'
    });

//Find for the kit
kit.findWearable();

//After kit connected
kit.on('connected', function () {
  console.log("Connected to the kit");

  setInterval(function () {
    kit.accelerometer();
  }, 200);
});

//On disconnect
kit.on('disconnected', function () {
  console.log('Disconnected from the wearable!');
});

//Return the 3 axis of the accelerometera ex: { x: 10, y: 5, z -10 }
kit.on('data:accelerometer', function () {
  console.log(kit.data.accelerometer);
});

//Return only the x axis
kit.on('data:accelerometer-x', function (data) {
  console.log('X is %s', data);
});

//Return only the y axis
kit.on('data:accelerometer-y', function (data) {
  console.log('Y is %s', data);
});

//Return only the z axis
kit.on('data:accelerometer-z', function () {
  console.log('Z is %s', data);
});
