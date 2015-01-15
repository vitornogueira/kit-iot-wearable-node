#Index

**Classes**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.discover(callback)](#Wearable#discover)
  * [wearable.connect(info)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.onData(data)](#Wearable#onData)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.isConnected()](#Wearable#isConnected)

**Events**

* [event: "connected"](#event_connected)
* [event: "error"](#event_error)
* [event: "disconnected"](#event_disconnected)
 
<a name="Wearable"></a>
#class: Wearable
**Extends**: `EventEmitter`  
**Members**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.discover(callback)](#Wearable#discover)
  * [wearable.connect(info)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.onData(data)](#Wearable#onData)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.isConnected()](#Wearable#isConnected)

<a name="new_Wearable"></a>
##new Wearable(config)
Creates an instance of the Wearable object

**Params**

- config `object` - OPTIONAL configuration object.  
  - name `string` - OPTIONAL (default is wearable) name of the wearable to connect.  

**Extends**: `EventEmitter`  
**Fires**

- [event:connected - will be emitted when connect to a wearable](event:connected - will be emitted when connect to a wearable)
- [event:disconnected - will be emitted if the wearable disconnect](event:disconnected - will be emitted if the wearable disconnect)
- [event:error - will be emitted if any error occur](event:error - will be emitted if any error occur)

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

<a name="Wearable#discover"></a>
##wearable.discover(callback)
Discover wearable kits.

**Params**

- callback `callback` - callback that will return the infomation about the wearables.  

**Example**  
```js
...

kit.discover(function (info) {
  //information about the wearable, 'name' and 'address' needed for connect
  console.log(info);
});
```

<a name="Wearable#connect"></a>
##wearable.connect(info)
Connect to a wearable kit.

**Params**

- info `object` - object that contains "address" and "name" of the wearable.  
  - address `string` - address of the wearable.  
  - name `string` - name of the wearable.  

**Example**  
```js
...

kit.discover(function (info) {
  //pass the info object from the discover callback
  kit.connect(info);

  //after connection the 'connected' event will be emitted
  kit.on('connected', function () {
    console.log('Wearable is Conected!');
  });
});
```

<a name="Wearable#disconnect"></a>
##wearable.disconnect()
Disconnect the wearable kit.

**Example**  
```js
...

kit.discover(function (info) {
  kit.connect(info);

  kit.on('connected', function () {
    kit.disconnect();
  });

  //after disconnect the 'disconnected' event will be emitted
  kit.on('disconnected', function () {
    console.log('Disconnected from wearable');
  });
});
```

<a name="Wearable#sendCommand"></a>
##wearable.sendCommand(command)
Send command to the wearable.

**Params**

- command `string` - command to send to the wearable.  

<a name="Wearable#onData"></a>
##wearable.onData(data)
On data receive from wearable.

**Params**

- data `string` - string received from the wearable.  

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

