##### RED Interactive Agency - Ad Technology

[![npm (tag)](https://img.shields.io/npm/v/@ff0000-ad-tech%2Fad-particles.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-particles)
[![GitHub issues](https://img.shields.io/github/issues/ff0000-ad-tech/ad-particles.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-particles)
[![npm downloads](https://img.shields.io/npm/dm/@ff0000-ad-tech%2Fad-particles.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Fad-particles)

[![GitHub contributors](https://img.shields.io/github/contributors/ff0000-ad-tech/ad-particles.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-particles/graphs/contributors/)
[![GitHub commit-activity](https://img.shields.io/github/commit-activity/y/ff0000-ad-tech/ad-particles.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-particles/commits/master)
[![npm license](https://img.shields.io/npm/l/@ff0000-ad-tech%2Fad-particles.svg?style=flat-square)](https://github.com/ff0000-ad-tech/ad-particles/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Particles

* * *

## API

## <a name="Emitter" href="./docs/Emitter.md">Emitter</a>
* new Emitter()
* <a href="./docs/Emitter.md#Emitter.tween">.tween</a>
* <a href="./docs/Emitter.md#Emitter.init">.init(canvasElement, setting)</a>
* <a href="./docs/Emitter.md#Emitter.set">.set(key, val, triggerChange)</a>
* <a href="./docs/Emitter.md#Emitter.get">.get(key)</a> ⇒ <code>number</code> \| <code>string</code> \| <code>object</code> \| <code>array</code>
* <a href="./docs/Emitter.md#Emitter.setProperties">.setProperties(obj)</a>
* <a href="./docs/Emitter.md#Emitter.addCustomBehavier">.addCustomBehavier(type, func)</a>
* <a href="./docs/Emitter.md#Emitter.removeCustomBehavier">.removeCustomBehavier(type, func)</a>
* <a href="./docs/Emitter.md#Emitter.emit">.emit()</a>
* <a href="./docs/Emitter.md#Emitter.stopEmitting">.stopEmitting()</a>
* <a href="./docs/Emitter.md#Emitter.empty">.empty()</a>
* <a href="./docs/Emitter.md#Emitter.pause">.pause()</a>
* <a href="./docs/Emitter.md#Emitter.resume">.resume()</a>
* <a href="./docs/Emitter.md#Emitter.to">.to(duration, props)</a>
* <a href="./docs/Emitter.md#Emitter.createParticles">.createParticles(amount)</a>
* <a href="./docs/Emitter.md#Emitter.addModel">.addModel(modelObj)</a>
* <a href="./docs/Emitter.md#Emitter.removeModel">.removeModel(id)</a>
## <a name="Particle" href="./docs/Particle.md">Particle</a>
* new Particle()
* <a href="./docs/Particle.md#Particle.update">.update()</a>
* <a href="./docs/Particle.md#Particle.getAnimationStyle">.getAnimationStyle()</a>
* <a href="./docs/Particle.md#Particle.render">.render()</a>
* <a href="./docs/Particle.md#Particle.applyForce">.applyForce()</a>
* <a href="./docs/Particle.md#Particle.isDead">.isDead()</a> ⇒ <code>boolean</code>
* <a href="./docs/Particle.md#Particle.checkWorld">.checkWorld(w)</a>
* <a href="./docs/Particle.md#Particle._checkBorder">._checkBorder(axis, val)</a>
## <a name="ParticleModel" href="./docs/ParticleModel.md">ParticleModel</a>
* new ParticleModel()
## <a name="Graphic.Shape" href="./docs/Graphic.Shape.md">Graphic.Shape</a>
* <a href="./docs/new_Graphic.md#new_Graphic.Shape_new">new Shape()</a>
## <a name="Graphic.Image" href="./docs/Graphic.Image.md">Graphic.Image</a>
* <a href="./docs/new_Graphic.md#new_Graphic.Image_new">new Image()</a>
## <a name="Graphic.Circle" href="./docs/Graphic.Circle.md">Graphic.Circle</a>
* <a href="./docs/new_Graphic.md#new_Graphic.Circle_new">new Circle(size, style)</a>
## <a name="Graphic.Rect" href="./docs/Graphic.Rect.md">Graphic.Rect</a>
* <a href="./docs/new_Graphic.md#new_Graphic.Rect_new">new Rect(width, height, style)</a>
## <a name="Graphic.Sprite" href="./docs/Graphic.Sprite.md">Graphic.Sprite</a>
* <a href="./docs/new_Graphic.md#new_Graphic.Sprite_new">new Sprite(image, size, style, spriteSetting)</a>

* * *