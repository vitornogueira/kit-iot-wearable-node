#Index

**Classes**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.findWearable()](#Wearable#findWearable)
  * [wearable.connect()](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.distance()](#Wearable#distance)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.playMelody(music)](#Wearable#playMelody)
  * [wearable.luminosity()](#Wearable#luminosity)
  * [wearable.temperature()](#Wearable#temperature)
  * [wearable.accelerometer(axis)](#Wearable#accelerometer)
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
  * [wearable.connect()](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.distance()](#Wearable#distance)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.playMelody(music)](#Wearable#playMelody)
  * [wearable.luminosity()](#Wearable#luminosity)
  * [wearable.temperature()](#Wearable#temperature)
  * [wearable.accelerometer(axis)](#Wearable#accelerometer)
  * [wearable.isConnected()](#Wearable#isConnected)

<a name="new_Wearable"></a>
##new Wearable(config)
Creates an instance of the Wearable object.

**Params**

- config `object` - configuration object.  
  - name `string` - REQUIRED name of the wearable to connect.  
  - logDeviceInfo `boolean` - OPTIONAL (dafault false) log device extra information.  

**Extends**: `EventEmitter`  
**Fires**

- [event:connected - will be emitted when connect to a wearable.](event:connected - will be emitted when connect to a wearable.)
- [event:disconnected - will be emitted if the wearable disconnect.](event:disconnected - will be emitted if the wearable disconnect.)
- [event:error - will be emitted if any error occur.](event:error - will be emitted if any error occur.)

**Example**  
```js
//pass a object with a param name to specify a wearable to connect
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
##wearable.connect()
Connect to a wearable kit. This method is executed during
the findWearable method.

**Fires**

- [event:connected - will be emitted when connect to a wearable.](event:connected - will be emitted when connect to a wearable.)

**Example**  
```js
...

kit.findWearable();

//after findWearable the 'connected' event will be emitted
kit.on('connected', function () {
  kit.ledON('RED');
  kit.playMelody();
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

<a name="Wearable#distance"></a>
##wearable.distance()
Get kit distance.

**Example**  
```js
...

kit.on('connected', function () {
  kit.getDistance();

  kit.on('data:distance', function (data) {
    console.log('Distance is %s', data);
  });
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

<a name="Wearable#playMelody"></a>
##wearable.playMelody(music)
Play music.

**Params**

- music `string` - OPTIONAL (default is MARIO)  

**Example**  
```js
...

kit.on('connected', function () {
  kit.playMelody(); //play the Mario music by default
  kit.playMelody('IMPERIAL'); //play the Imperial March music
});
```

<a name="Wearable#luminosity"></a>
##wearable.luminosity()
Get luminosity value.

**Example**  
```js
...

kit.on('connected', function () {
  kit.luminosity();

  //On luminosity data
  kit.on('data:luminosity', function (data) {
    console.log(data);
  });
});
```

<a name="Wearable#temperature"></a>
##wearable.temperature()
Get temperature value.

**Example**  
```js
...

kit.on('connected', function () {
  kit.temperature();

  //On temperature data
  kit.on('data:temperature', function (data) {
    console.log(data);
  });
});
```

<a name="Wearable#accelerometer"></a>
##wearable.accelerometer(axis)
Get accelerometer value.

**Params**

- axis `string` - OPTIONAL (default is x,y,z)  

**Example**  
```js
...

kit.on('connected', function () {
  kit.accelerometer();

  //On accelerometer data
  kit.on('data:accelerometer', function (data) {
    console.log(data);
  });
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

