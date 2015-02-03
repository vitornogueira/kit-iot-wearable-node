#Kit IoT Wearable Telefonica VIVO - Bluetooth 2
[![NPM](https://nodei.co/npm/kit-iot-wearable-bluetooth2.png?downloads=true)](https://nodei.co/npm/kit-iot-wearable-bluetooth2/)

Módulo de [NodeJS](http://nodejs.org/) para conectar via bluetooth com o [Kit de Desenvolvimento IoT Wearable](http://iot.telefonicabeta.com/).

O kit possui os seguintes sensores:
  * Módulo Bluetooth
  * Luminosidade
  * Temperatura
  * Acelerômetro
    * eixo x
    * eixo y
    * eixo z
  * LED RGB
  * Buzzer


##Como utilizar
Para utilizar o módulo instale ele utilizando o [npm](https://www.npmjs.com/)
```
$ npm install kit-iot-wearable-bluetooth2
```

Exemplo de utilização
```js
var Wearable = require('kit-iot-wearable-bluetooth2'),
    kit = new Wearable({
      name: 'name-of-your-wearable'
    });

kit.findWearable();

//after connect the 'connected' event will be emitted
kit.on('connected', function () {
  kit.ledON('RED');
  kit.playMelody();
});
```

Para mais exemplos veja a [documentação](DOCS.md)


##Documentação para utilização
Veja a documentação - [link](DOCS.md)


##Autor
| [![twitter/vitorleal](http://gravatar.com/avatar/e133221d7fbc0dee159dca127d2f6f00?s=80)](http://twitter.com/vitorleal "Follow @vitorleal on Twitter") |
|---|
| [Vitor Leal](http://vitorleal.com) |
