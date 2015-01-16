var Wearable = require('./lib/bluetooth'),
    kit = new Wearable();

//Start looking for the wearable
kit.findWearable();

//Will be emitted after the dicover find a wearable
kit.on('found', function () {
  console.log('found event');
  console.log(kit.devices);
});

kit.on('connected', function () {
  console.log('Wearable is Conected!');

  kit.ledON('RED');
  kit.playMusic();

  kit.ledOFF();
  kit.ledON('GEEN');

  kit.getTemperature();

});

//On error event
kit.on('error', function (err) {
  console.log(err);
});

kit.on('data', function (data) {
  console.log(data);
});


//module.exports = require('./lib/bluetooth');

