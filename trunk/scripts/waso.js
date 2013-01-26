function Waso() {
	var self = this;

	var x = 10, y;
	var accumulator = 0;
	var frame = 0;
	var finalWidth = 60;
	var finalHeight = 70;
	
	var sprite = new Image();
	sprite.src = "graphics/santa.png";
	
	this.zOrder = 100;
	
	this.init = function() {
		x = 10;
		y = 10;
	}
	
	this.visible = true;
	
	this.update = function(delta) {
		accumulator += delta;
		if (accumulator >= 0.02) {
			accumulator = 0;
			frame++;
			if (frame > 15) { frame = 0; }
		}
	}
	
	this.draw = function(context) {
		context.drawImage(sprite, frame * 92, 0, 92, 114,
			x, y, finalWidth, finalHeight);
	}
}