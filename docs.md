#Index

**Classes**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.discover(discoverCallback)](#Wearable#discover)
  * [wearable.connect(info)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.onData(data)](#Wearable#onData)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.isConnected()](#Wearable#isConnected)

**Typedefs**

* [callback: discoverCallback](#discoverCallback)
 
<a name="Wearable"></a>
#class: Wearable
Creates an instance of the Wearable object

**Extends**: `external:EventEmitter`  
**Members**

* [class: Wearable](#Wearable)
  * [new Wearable(config)](#new_Wearable)
  * [wearable.discover(discoverCallback)](#Wearable#discover)
  * [wearable.connect(info)](#Wearable#connect)
  * [wearable.disconnect()](#Wearable#disconnect)
  * [wearable.sendCommand(command)](#Wearable#sendCommand)
  * [wearable.onData(data)](#Wearable#onData)
  * [wearable.ledOFF()](#Wearable#ledOFF)
  * [wearable.ledON(color, value)](#Wearable#ledON)
  * [wearable.isConnected()](#Wearable#isConnected)

<a name="new_Wearable"></a>
##new Wearable(config)
**Params**

- config `object` - OPTIONAL configuration object.  
  - name `string` - OPTIONAL (default is wearable) name of the wearable to connect.  

**Extends**: `external:EventEmitter`  
<a name="Wearable#discover"></a>
##wearable.discover(discoverCallback)
Discover wearable kits.

**Params**

- discoverCallback <code>[discoverCallback](#discoverCallback)</code> - callback that will return the infomation about the wearables.  

<a name="Wearable#connect"></a>
##wearable.connect(info)
Connect to a wearable kit.

**Params**

- info `object` - object that contains address and name of the wearable.  

<a name="Wearable#disconnect"></a>
##wearable.disconnect()
Disconnect the wearable kit.

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
<a name="discoverCallback"></a>
#callback: discoverCallback
Callback `discoverCallback` is executed after the bluetooth devices are discovered.

**Params**

- info `object` - object containgin the device informations.  
  - address `string` - the bluetooth device address.  
  - name `string` - the bluetooth device name.  

**Type**: `function`  
