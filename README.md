#Kit IoT Wearable Telefonica VIVO
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
Primerio instale as dependências do projeto
```
$ npm install
```

####Validando o código
Utilizamos o [gulp](https://www.npmjs.com/package/gulp) para automatizar as tarefas do projeto.
Para
```
$ gulp
```

Ou para rodar um comando específico como o [jshint](http://jshint.com/) para validar a qualidade do código.
```
$ gulp hint
``


####Atualizando a documentação
Utilizamos o [jsdoc](http://usejsdoc.org/) para gerar a documentação do módulo

Depois de fazer as alteração lembre de atualizar a documentação
```
$ npm run docs
```
