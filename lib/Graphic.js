/**
	@npmpackage
	@module Graphic
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-particles">ad-particles</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Graphic } from 'ad-particles'
		</codeblock>
		<br><br>
		
		A simple, light weight class for rendering shapes and images on canvas element with assigned style to work with the particle system.
		Graphic.Shape is the parent class that remains netural to keep the flexiblity to create more classes based on needs in different projects.
		<br><br>

		To keep it practical while maintaining it as light as possible, there are four classes currently available:<br>
		<ul>
			<li>Graphic.Image</li>
			<li>Graphic.Sprite</li>
			<li>Graphic.Circle</li>
			<li>Graphic.Rect</li>
		</ul> 
*/
import { MathUtils, ObjectUtils } from 'ad-utils'

const Graphic = {
	DEFAULTSIZE: 10,
	DEFAULTSTYLE: {
		x: 0,
		y: 0,
		alpha: 1,
		scale: 1,
		rotation: 0,
		transformOrigin: { x: 0.5, y: 0.5 },
		color: [255, 0, 0],
		strokeWidth: 0,
		strokeColor: 'rgba(0, 0, 0, 1)'
	}
}

/**
	@npmpackage
	@class Graphic.Shape
	@desc
		The parent class of other Graphic classes. It handles color, alpha, translation, rotation and scaling. 

*/
Graphic.Shape = class {
	static getRGBA = function getRGBA(rgb, alpha) {
		const r = ~~MathUtils.restrict(rgb[0], 0, 255)
		const g = ~~MathUtils.restrict(rgb[1], 0, 255)
		const b = ~~MathUtils.restrict(rgb[2], 0, 255)
		const a = MathUtils.restrict(alpha, 0, 1)

		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
	}

	constructor() {
		this.hasPath = true
	}

	render(ctx, style = {}, frameCount = 0) {
		style = ObjectUtils.defaults(style, this.style)
		style.scale = MathUtils.restrict(style.scale, 0, Infinity)
		style.alpha = MathUtils.restrict(style.alpha, 0, 1)
		const w = this.width * style.scale
		const h = this.height * style.scale

		style.color = Graphic.Shape.getRGBA(style.color, style.alpha)

		ctx.save()

		if (style.alpha < 1 && !this.hasPath) {
			ctx.globalAlpha = style.alpha
		}

		ctx.translate(w * -style.transformOrigin.x, h * -style.transformOrigin.y)

		if (style.rotation !== 0) {
			const tw = style.x + w * style.transformOrigin.x
			const th = style.y + h * style.transformOrigin.y
			ctx.translate(tw, th)
			ctx.rotate(MathUtils.toRadians(style.rotation))
			ctx.translate(-tw, -th)
		}

		if (this.hasPath) {
			ctx.beginPath()
		}

		this.draw(ctx, style, w, h, frameCount)

		if (this.hasPath) {
			ctx.closePath()
			ctx.fillStyle = style.color
			ctx.fill()

			if (style.strokeWidth > 0) {
				ctx.lineWidth = style.strokeWidth
				ctx.strokeStyle = style.strokeColor
				ctx.stroke()
			}
		}

		ctx.restore()
	}
}

/**
	@npmpackage
	@class Graphic.Image
	@desc
		A class for rendering images on canvas. The size parameter applys to width. The height
		is calculated base the the image width and height ratio and call draw method of the child class.
*/
Graphic.Image = class extends Graphic.Shape {
	constructor(image, size = image.width, style = {}) {
		super()

		this.hasPath = false
		this.image = image
		this.width = size
		this.height = this.width * (image.height / image.width)
		this.style = ObjectUtils.defaults(style, Graphic.DEFAULTSTYLE)
	}

	draw(ctx, style, w, h) {
		ctx.drawImage(this.image, style.x, style.y, w, h)
	}
}

/**
	@npmpackage
	@class Graphic.Circle
	@param {number} size
		diameter of the circle
	@param {object} style
		Default to {@link Graphic.DEFAULTSTYLE}
	@desc
		A class for rendering circles on canvas

*/
Graphic.Circle = class extends Graphic.Shape {
	constructor(size = Graphic.DEFAULTSIZE, style = {}) {
		super()

		this.width = size * 0.5
		this.height = this.width
		this.style = ObjectUtils.defaults(style, Graphic.DEFAULTSTYLE)
	}

	draw(ctx, style, w) {
		ctx.arc(style.x + w * 0.5, style.y + w * 0.5, w, 0, Math.PI * 2)
	}
}

/**
	@npmpackage
	@class Graphic.Rect
	@param {number} width
		width of the rectangle
	@param {number} height
		height of the rectangle
	@param {object} style
		Default to {@link Graphic.DEFAULTSTYLE}
	@desc
		A class for rendering rectangles on canvas.

*/

Graphic.Rect = class extends Graphic.Shape {
	constructor(width = Graphic.DEFAULTSIZ, height = Graphic.DEFAULTSIZ, style = {}) {
		super()

		this.width = width
		this.height = height
		this.style = ObjectUtils.defaults(style, Graphic.DEFAULTSTYLE)
	}

	draw(ctx, style, w, h) {
		ctx.rect(style.x, style.y, w, h)
	}
}

/**
	@npmpackage
	@class Graphic.Sprite
	@param {Image} image
		image of the sprite sheet
	@param {number} size
		display width of per frame
	@param {object} style
		Default to {@link Graphic.DEFAULTSTYLE}
	@param {object} spriteSetting
		Object with the following properties:

		@property {number} frameWidth
			width of per frame 

		@property {number} frameHeight
			height of per frame

		@property {number} frameNumber
			number of total frames

		@property {number} speed
			the speed of the animation

		@property {boolean} loop

	@desc
		A class for rendering spritesheet animation on canvas.

*/

Graphic.Sprite = class extends Graphic.Shape {
	constructor(image, size, style = {}, spriteSetting) {
		super()

		this.hasPath = false
		this.setting = spriteSetting
		this.image = image
		this.oriWidth = image.width
		this.oriHeight = image.height
		this.width = size || this.oriWidth
		this.height = this.width * (this.setting.frameWidth / this.setting.frameHeight)
		this.style = ObjectUtils.defaults(style, Graphic.DEFAULTSTYLE)
		this.frameLen = ~~(1 / this.setting.speed)
		this.colNumber = this.oriWidth / this.setting.frameWidth
	}

	draw(ctx, style, w, h, frameCount) {
		let frameIndex = ~~(frameCount / this.frameLen)
		if (this.setting.loop) {
			frameIndex = frameIndex % this.setting.frameNumber
		} else {
			const fn = this.setting.frameNumber - 1
			frameIndex = frameIndex > fn ? fn : frameIndex
		}

		const fw = this.setting.frameWidth
		const fh = this.setting.frameHeight
		const ratio = w / fw

		const sx = (frameIndex * this.setting.frameWidth) % this.oriWidth
		const sy = ~~(frameIndex / this.colNumber) * this.setting.frameHeight

		ctx.drawImage(this.image, sx, sy, fw, fh, style.x, style.y, fw * ratio, fh * ratio)
	}
}

export default Graphic
