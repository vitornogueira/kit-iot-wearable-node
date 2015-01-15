var Wearable = require('./lib/bluetooth'),
    kit = new Wearable();

//Will be emitted after the dicover find a wearable
kit.on('found', function () {
  console.log('found event')
  kit.connect();
});

kit.on('connected', function () {
  console.log('Wearable is Conected!');
  kit.ledON();
});

//On error event
kit.on('error', function (err) {
  console.log(err);
});

kit.on('data', function (data) {
  console.log(data);
});


//Start looking for the wearable
kit.discover();

//module.exports = require('./lib/bluetooth');

