var Wearable = require('./lib/bluetooth');
    kit = new Wearable();

kit.discover(function (info) {
  console.log(info);
  kit.connect(info);

  kit.on('connected', function () {
    console.log('Wearable is Conected!');

    kit.ledOn();
  });

  //On error event
  kit.on('error', function (err) {
    console.log(err);
  });

  kit.on('data', function (data) {
    console.log(data);
  });
});


//module.exports = require('./lib/bluetooth');

