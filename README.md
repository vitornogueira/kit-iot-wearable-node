#Kit IoT Wearable Telefonica VIVO [![Build Status](https://travis-ci.org/telefonicadigital/kit-iot-wearable-node.svg?branch=master)](https://travis-ci.org/telefonicadigital/kit-iot-wearable-node)
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

##Documentação
Veja a documentação - [link](DOCS.md)


##Desenvolvimento
Instale as dependências do projeto.
```
$ npm install
```

Instale o [gulp](https://www.npmjs.com/package/gulp) globalmente para poder rodar os tarefas automatizadas.
```
$ npm install gulp --global
```

Instale o [jshint]() globalemte para poder validar a qualidade do código.
```
$ npm install jshint --global
```

###Validando o código
Utilizamos o [gulp](https://www.npmjs.com/package/gulp) para automatizar as tarefas do projeto.
```
$ gulp
```

Ou para rodar um comando específico como o [jshint](http://jshint.com/) para validar a qualidade do código.
```
$ gulp hint
```


###Atualizando a documentação
Utilizamos o [jsdoc](http://usejsdoc.org/) para gerar a documentação do módulo.

Depois de fazer as alteração lembre de atualizar a documentação.
```
$ npm run docs
```


##Autor
| [![twitter/vitorleal](http://gravatar.com/avatar/e133221d7fbc0dee159dca127d2f6f00?s=80)](http://twitter.com/vitorleal "Follow @vitorleal on Twitter") |
|---|
| [Vitor Leal](http://vitorleal.com) |
