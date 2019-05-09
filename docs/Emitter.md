<a name="Emitter"></a>

## Emitter
**Kind**: global class  

* [Emitter](#Emitter)
    * [new Emitter()](#new_Emitter_new)
    * [.tween](#Emitter.tween)
    * [.init(canvasElement, setting)](#Emitter.init)
    * [.set(key, val, triggerChange)](#Emitter.set)
    * [.get(key)](#Emitter.get) ⇒ <code>number</code> \| <code>string</code> \| <code>object</code> \| <code>array</code>
    * [.setProperties(obj)](#Emitter.setProperties)
    * [.addCustomBehavier(type, func)](#Emitter.addCustomBehavier)
    * [.removeCustomBehavier(type, func)](#Emitter.removeCustomBehavier)
    * [.emit()](#Emitter.emit)
    * [.stopEmitting()](#Emitter.stopEmitting)
    * [.empty()](#Emitter.empty)
    * [.pause()](#Emitter.pause)
    * [.resume()](#Emitter.resume)
    * [.to(duration, props)](#Emitter.to)
    * [.createParticles(amount)](#Emitter.createParticles)
    * [.addModel(modelObj)](#Emitter.addModel)
    * [.removeModel(id)](#Emitter.removeModel)

<a name="new_Emitter_new"></a>

### new Emitter()
Emitter is a particle system that emits and controls particles and renders on a canvas element.
It comes with some basic physic features such as gravity, force, bounce and world boundary. 
<pre class="sunlight-highlight-javascript">
import { Emitter } from 'ad-particles'
</pre>
The default setting is in <code>js/EmitterData.js</code> that comes with standard-particles template. 
To tweak the default data, launch particle simulator in AdApp and work with the interface. When you have 
reached your desired effect, copy the genrated code back to <code>js/EmitterData.js</code>.
<br><br>
For more info about the simulator, visit
{@link https://confluence.ff0000.com/display/AT/PARTICLES }

**Example**  
```js
//create a canvas element
View.main.particleCanvas = new UICanvas({
	id: 'particle-canvas',
	target: View.main,
	css: {
		width: adParams.adWidth,
		height: adParams.adHeight
	}
});

// create an instance of Emitter
adData.particleSystem = new Emitter()
// initiate the emitter with the target canvas element
adData.particleSystem.init(View.main.particleCanvas)

// start emitting
adData.particleSystem.emit()

// stop emitting
adData.particleSystem.stopEmitting()
```
<a name="Emitter.tween"></a>

### Emitter.tween
Creates a object to hold tween functions:

**Kind**: static property of [<code>Emitter</code>](#Emitter)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tween.to | <code>function</code> | [to](#Emitter.to) |

<a name="Emitter.init"></a>

### Emitter.init(canvasElement, setting)
Initiates the Emitter.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| canvasElement | <code>CanvasElement</code> | a canvas element |
| setting | <code>object</code> | optional, contains fps and emitterData as properties to overide the frame rate and EmitterData, see Properties for more info: |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| emitterData | <code>EmitterData</code> |  |
| fps | <code>number</code> | default fps(60) |

**Example**  
```js
var myEmitter = new Emitter()

// init emitter with default setting
myEmitter.init(canvasElement)

// init emitter with custom setting
var customSetting = {
	fps: 30,
	emitterData: myCustomEmitterData
}
myEmitter.init(canvasElement, customSetting)
```
<a name="Emitter.set"></a>

### Emitter.set(key, val, triggerChange)
Sets a sinlge property of emitter properties. To set multiple properties at once, please use setProperties.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the name of the property (supports nested object key) |
| val | <code>number</code> \| <code>string</code> \| <code>object</code> \| <code>array</code> | the value of the property |
| triggerChange | <code>boolean</code> | optional, it is for internal use |

**Example**  
```js
myEmitter.set('emitRate', 0.1)

myEmitter.set('origin.value.x', 0)
```
<a name="Emitter.get"></a>

### Emitter.get(key) ⇒ <code>number</code> \| <code>string</code> \| <code>object</code> \| <code>array</code>
Gets a sinlge property of emitter properties.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Returns**: <code>number</code> \| <code>string</code> \| <code>object</code> \| <code>array</code> - The value of the property  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the name of the property (supports nested object key) |

**Example**  
```js
var rate = myEmitter.get('emitRate')
var lifeSpanValue = myEmitter.get('lifeSpan.value')
```
<a name="Emitter.setProperties"></a>

### Emitter.setProperties(obj)
Sets a group of properties of emitter properties (supports nested object key)

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | an object containing properties and values |

**Example**  
```js
myEmitter.setProperties({
	'emitRate': 0.1,
	'background.type': 'none',
	'origin.value.x': 100
})
```
<a name="Emitter.addCustomBehavier"></a>

### Emitter.addCustomBehavier(type, func)
Adds on custom behavier in the run loop. If the type is 'particle' function, it will be called in each particle iteration in the run loop
	with the iterated particle as the first parameter and an array of all particles as the second. If the type is 'emitter', it will be called
	in each run loop with the emitter as a parameter.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | 'particle' or 'emitter' |
| func | <code>function</code> | function to add |

**Example**  
```js
function customParticleBehavier1 ( particle, particleGroup ) {
	var particleLocation = particle.properties.location;
	var i;
	//if there is another particle in the range of 60, set the color to red
	//otherwise set it to yellow
	for( i=0; i<particleGroup.length; i++ ) {
		var particle2 = particleGroup[ i ];
		var dist = particleLocation.dist( particle2.properties.location );
		if( dist < 60 ) {
			particle.properties.style.color = [ 255, 0, 0 ];
		} else {
			particle.properties.style.color = [ 255, 255, 0 ];
		}
	}
}
function customParticleBehavier2 ( particle, particleGroup ) {
particle.properties.style.scale = particle.properties.location.y * 0.1;
} 
function customEmitterBehavier ( emitter ) {
	//animate the gravityAmount using frameCount
	emitter.set( 'gravityAmount', Math.sin( emitter.frameCount * 0.1 ));
}

myEmitter.addCustomBehavier('particle', customParticleBehavier1)
myEmitter.addCustomBehavier('particle', customParticleBehavier2)
myEmitter.addCustomBehavier('emitter', customEmitterBehavier)
```
<a name="Emitter.removeCustomBehavier"></a>

### Emitter.removeCustomBehavier(type, func)
Removes the custom behavier added.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | 'particle' or 'emitter' |
| func | <code>function</code> | function to remove |

**Example**  
```js
myEmitter.removeCustomBehavier('particle', customParticleBehavier1)
myEmitter.removeCustomBehavier('emitter', customEmitterBehavier)
```
<a name="Emitter.emit"></a>

### Emitter.emit()
Starts emitting particles.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Example**  
```js
myEmitter.emit()
```
<a name="Emitter.stopEmitting"></a>

### Emitter.stopEmitting()
Stops emitting particles.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Example**  
```js
myEmitter.stopEmitting()
```
<a name="Emitter.empty"></a>

### Emitter.empty()
Emptys all particles.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Example**  
```js
myEmitter.empty()
```
<a name="Emitter.pause"></a>

### Emitter.pause()
Pause the run loop ( freeze it! ).

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Example**  
```js
myEmitter.pause()
```
<a name="Emitter.resume"></a>

### Emitter.resume()
Resume the run loop after pause.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  
**Example**  
```js
myEmitter.resume()
```
<a name="Emitter.to"></a>

### Emitter.to(duration, props)
It creates a TweenLite animation for tweening emitter properties.
	( The purpose of this is to tween multiple nested keys in property object, since TweenLite doesn't support nested keys. )
	<br><br>
	<b>NOTE!!!</b>
	This method is on the [tween](#Emitter.tween) object!

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | duration of the tween in seconds |
| props | <code>object</code> | properties to use |

**Example**  
```js
myEmitter.tween.to( 0.3, {
	'emitRate': 1,
	'velocity.value.angle': 45,
	'origin.value.x': 100,
	'origin.value.y': 350,
	delay: 1,
	onComplete: function () {
		console.log( 'Done!' );
	}
})
```
<a name="Emitter.createParticles"></a>

### Emitter.createParticles(amount)
Creates particles from the particle models of the emitter.

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | the amount of particles to create |

<a name="Emitter.addModel"></a>

### Emitter.addModel(modelObj)
Add a particle model

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| modelObj | <code>object</code> | the object of the particle model to be added |

**Example**  
```js
var modelObj = {
	type: "Circle",
    width: 12,
    properties: {},
    id: 'model5'
};
myEmitter.addModel(modelObj)
```
<a name="Emitter.removeModel"></a>

### Emitter.removeModel(id)
Remove a particle model by its id

**Kind**: static method of [<code>Emitter</code>](#Emitter)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the id of the particle model to be removed |

**Example**  
```js
myEmitter.removeModel('model5')
```
