<a name="Particle"></a>

## Particle
**Kind**: global class  

* [Particle](#Particle)
    * [new Particle()](#new_Particle_new)
    * [.update()](#Particle.update)
    * [.getAnimationStyle()](#Particle.getAnimationStyle)
    * [.render()](#Particle.render)
    * [.applyForce()](#Particle.applyForce)
    * [.isDead()](#Particle.isDead) ⇒ <code>boolean</code>
    * [.checkWorld(w)](#Particle.checkWorld)
    * [._checkBorder(axis, val)](#Particle._checkBorder)

<a name="new_Particle_new"></a>

### new Particle()
This Particle class is used along with [ParticleModel](#ParticleModel) and [Emitter](#Emitter) class. 
<pre class="sunlight-highlight-javascript">
import { Particle } from 'ad-particles'
</pre>

<a name="Particle.update"></a>

### Particle.update()
Updates the properties of the particle

**Kind**: static method of [<code>Particle</code>](#Particle)  
<a name="Particle.getAnimationStyle"></a>

### Particle.getAnimationStyle()
Update the animated style of a particle

**Kind**: static method of [<code>Particle</code>](#Particle)  
<a name="Particle.render"></a>

### Particle.render()
Renders the particle onto the canvas context.

**Kind**: static method of [<code>Particle</code>](#Particle)  
<a name="Particle.applyForce"></a>

### Particle.applyForce()
Applies force to the particle.

**Kind**: static method of [<code>Particle</code>](#Particle)  
<a name="Particle.isDead"></a>

### Particle.isDead() ⇒ <code>boolean</code>
Returns a boolean of is the particle is dead depending on two situations:
	<br>
	<ol>
		<li>if it has reaches its lifespan, or</li>
		<li>if it is out of the canvas and if [EmitterData.killIfOutOfCanvas](EmitterData.killIfOutOfCanvas) is set to true</li>
	</ol>

**Kind**: static method of [<code>Particle</code>](#Particle)  
<a name="Particle.checkWorld"></a>

### Particle.checkWorld(w)
Remains the particle in the defined world boundaries by its body size and bounces it when it hits the boundaries.

**Kind**: static method of [<code>Particle</code>](#Particle)  

| Param | Type | Description |
| --- | --- | --- |
| w | <code>array</code> | an array that contains left X, right X, top Y, bottom Y as values for the boundary |

<a name="Particle._checkBorder"></a>

### Particle.\_checkBorder(axis, val)
Check it the particle location reaches the border, if ture, it bounces to it.

**Kind**: static method of [<code>Particle</code>](#Particle)  

| Param | Type | Description |
| --- | --- | --- |
| axis | <code>string</code> | String 'x' or 'y' |
| val | <code>number</code> | the location of the border on the X or Y axis |

