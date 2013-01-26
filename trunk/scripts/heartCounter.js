function HeartCounter() {
	var self = this;
	var heartSize = 50;
	var heart = new Image();
	var voidHeart = new Image();
	var beatSound = new Audio();
	
	var counter = 0;
	var beater = function () {};
	var beaterCounter = 0;
	var beatSwitch = 0;
	var beatSize = -5;
	
	voidHeart.src = "graphics/voidheart.png";
	heart.src = "graphics/heart.png";
	beatSound.src = "fx/heartBeat.mp3";
	
	this.totalHeart = 3;
	this.totalLives = 2;
	this.zOrder = 1000;
	this.init = function() {
		beatSound.volume = 0.3;
		beatSound.loop = true;
		beatSound.play();
	}
	this.visible = true;
	
	this.update = function(delta) {
		counter += delta;
		
		if (counter >= 0.85) {
			counter = 0;
			beater = function () {
				beaterCounter += delta;
				if (beaterCounter >= 0.10) {
					beaterCounter = 0;
					doBeat();
				}
			}
		}
		
		beater();
	}
	
	this.draw = function(spriteBatch) {
		var h = heart;
		
		for (var i = 0; i < self.totalHeart; i++) {
			if (i >= self.totalLives) { h = voidHeart; }
			spriteBatch.drawImage(h, heartSize * i, 100, heartSize, heartSize);
		}
	}
	
	function doBeat() {
		beatSize *= -1;
		heartSize -= beatSize;
		beatSwitch++;
		if (beatSwitch >= 4) {
			beatSwitch = 0;
			beater = function () {};
		}
	}
}