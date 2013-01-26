function HeartCounter() {
	var self = this;
	
	var sprite = new Image();
	sprite.src = "graphics/heart.png";
	
	this.totalHeart = 3;
	this.zOrder = 1000;
	
	this.init = function() {
	}
	
	this.visible = true;
	
	this.update = function(delta) {
	}
	
	this.draw = function(spriteBatch) {
		for (var i = 0; i < self.totalHeart; i++) {
			spriteBatch.drawImage(sprite, 128 * i, 10);
		}
	}
}