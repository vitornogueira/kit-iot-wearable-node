#Index

**Classes**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.findWearable()](#Wearable#findWearable)
  * [wearable.connect(device)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.playMusic(music)](#Wearable#playMusic)
  * [wearable.isConnected()](#Wearable#isConnected)

**Events**

* [event: "connected"](#event_connected)
* [event: "error"](#event_error)
* [event: "disconnected"](#event_disconnected)

**Functions**

* [checkValue(message)](#checkValue)
* [log(message, header, showLog)](#log)
 
<a name="Wearable"></a>
#class: Wearable
**Extends**: `EventEmitter`  
**Members**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.findWearable()](#Wearable#findWearable)
  * [wearable.connect(device)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.playMusic(music)](#Wearable#playMusic)
  * [wearable.isConnected()](#Wearable#isConnected)

<a name="new_Wearable"></a>
##new Wearable(config)
Creates an instance of the Wearable object.

**Params**

- config `object` - OPTIONAL configuration object.  
  - name `string` - OPTIONAL (default is wearable) name of the wearable to connect.  

**Extends**: `EventEmitter`  
**Fires**

- [event:connected - will be emitted when connect to a wearable.](event:connected - will be emitted when connect to a wearable.)
- [event:disconnected - will be emitted if the wearable disconnect.](event:disconnected - will be emitted if the wearable disconnect.)
- [event:error - will be emitted if any error occur.](event:error - will be emitted if any error occur.)

**Example**  
```js
var Wearable = require('kit-iot-wearable'),
    kit = new Wearable();

//or pass a object with a param name to specify a wearable name
var Wearable = require('kit-iot-wearable'),
    kit = new Wearable({
      name: 'name-of-your-wearable'
    });
```

<a name="Wearable#findWearable"></a>
##wearable.findWearable()
Look for the wearable kit.

**Example**  
```js
...

//Start looking for the wearable
kit.findWearable();
```

<a name="Wearable#connect"></a>
##wearable.connect(device)
Connect to a wearable kit. This method is executed during
the findWearable method.

**Params**

- device `object` - object with device information.  
  - address `string` - address of the wearable.  
  - name `string` - name of the wearable.  

**Fires**

- [event:connected - will be emitted when connect to a wearable.](event:connected - will be emitted when connect to a wearable.)

**Example**  
```js
...

kit.connect({
  name   : 'wearable',
  address: '30-14-08-26-24-39'
});

//after connect the 'connected' event will be emitted
kit.on('connected', function () {
  kit.ledON('RED');
  kit.playMusic();
});
```

<a name="Wearable#disconnect"></a>
##wearable.disconnect()
Disconnect the wearable kit.

**Fires**

- [event:disconnected - will be emitted if the wearable disconnect.](event:disconnected - will be emitted if the wearable disconnect.)

**Example**  
```js
...

kit.on('connected', function () {
  kit.disconnect();
});

//after disconnect the 'disconnected' event will be emitted
kit.on('disconnected', function () {
  console.log('Disconnected from wearable');
});
```

<a name="Wearable#sendCommand"></a>
##wearable.sendCommand(command)
Send command to the wearable.

**Params**

- command `string` - command to send to the wearable.  

**Example**  
```js
...

kit.on('connected', function () {
  //send the command to read the luminosity sensor
  kit.sendCommand('#LI0000');
});
```

<a name="Wearable#ledOFF"></a>
##wearable.ledOFF()
Trun off LED.

**Example**  
```js
...

kit.on('connected', function () {
  kit.ledOFF();
});
```

<a name="Wearable#ledON"></a>
##wearable.ledON(color, value)
Trun on LED.

**Params**

- color `string` - OPTIONAL (default is GREEN) color of the led to turn on  
- value `number` - OPTIONAL value of the intensity for the led (0 to 255)  

**Example**  
```js
...

kit.on('connected', function () {
  kit.ledON(); //turn on the GREEN led by default
  kit.ledON('GREEN'); //turn on the GREEN led
  kit.ledON('RED'); //turn on the RED led
  kit.ledON('BLUE'); //turn on the BLUE led
});
```

<a name="Wearable#playMusic"></a>
##wearable.playMusic(music)
Play music.

**Params**

- music `string` - OPTIONAL (default is FIRST)  

**Example**  
```js
...

kit.on('connected', function () {
  kit.playMusic(); //play the MARIO music
  kit.playMusic('CHRISTMAS'); //play the CHRISTMAS music
});
```

<a name="Wearable#isConnected"></a>
##wearable.isConnected()
Check if have any wearable connected.

**Returns**: `boolean`  
**Example**  
```js
...

kit.on('connected', function () {
  console.log(kit.isConnected());
});
```

<a name="event_connected"></a>
#event: "connected"
Connected event will be fired when connect to a wearable.

**Example**  
```js
...

kit.on('connected', function () {
  console.log('Wearable is Conected!');
});
```

<a name="event_error"></a>
#event: "error"
Error event will be fired when any error occur.

**Type**: `string`  
**Example**  
```js
...

kit.on('error', function (err) {
  console.log(err);
});
```

<a name="event_disconnected"></a>
#event: "disconnected"
Disconnected event will be fired when disconnect form a wearable.

**Example**  
```js
...

kit.on('disconnected', function () {
  console.log('Disconnected from wearable');
});
```

<a name="checkValue"></a>
#checkValue(message)
Check if the value is between the range of 0 to 255.

**Params**

- message `number` - the message that will be logged.  

**Returns**: `number`  
<a name="log"></a>
#log(message, header, showLog)
Console log helper.

**Params**

- message `string` - the message that will be logged.  
- header `boolean` - OPTIONAL (default is false) if it should be printed as a header.  
- showLog `boolean` - OPTIONAL (default is true) if it should log.  

