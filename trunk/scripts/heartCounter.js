function HeartCounter() {
	var self = this;
	var heartSize = 30;
	var heart = new Image();
	var voidHeart = new Image();
	
	voidHeart.src = "graphics/voidheart.png";
	heart.src = "graphics/heart.png";
	
	this.totalHeart = 3;
	this.totalLives = 2;
	
	this.zOrder = 1000;
	
	this.init = function() {
	}
	
	this.visible = true;
	
	this.update = function(delta) {
	}
	
	this.draw = function(spriteBatch) {
		var h = heart;
		
		for (var i = 0; i < self.totalHeart; i++) {
			if (i >= self.totalLives) { h = voidHeart; }
			spriteBatch.drawImage(h, heartSize * i, 100, heartSize, heartSize);
		}
	}
}