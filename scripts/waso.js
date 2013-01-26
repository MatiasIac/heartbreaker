function Waso() {
	var self = this;

	var x = 10;
	var accumulator = 0;
	var frame = 0;
	var finalWidth = 30;
	var finalHeight = 62;
	var animationDelay = 0.04;
	
	this.building = {};
	this.depto; 
	this.piso;
	
	
	var sprite;
	var spriteL = new Image();
	spriteL.src = "graphics/sprite_personaje_l.png";
	
	var spriteR = new Image();
	spriteR.src = "graphics/sprite_personaje_r.png";
	
	
	this.zOrder = 100;
	
	this.init = function() {
		x = 10;
		sprite = spriteR;
		currentAction = walkingRight;		
	}
	
	this.visible = true;
	
	this.update = function(delta) {				
		accumulator += delta;
		currentAction(delta);
	}
	
	this.draw = function(context) {
		context.drawImage(sprite, frame * 30, 0, 30, 62,
			x, g_baseline - sprite.height, finalWidth, finalHeight);
	}
	
	var currentAction = function(delta) {};
	
	function walkingRight(delta) {
		if (accumulator >= animationDelay) {
			accumulator = 0;
			frame++;
			if (frame > 8) { frame = 0; }
			x+= 1.3;
			if (x > 800) { 
				sprite = spriteL;
				currentAction = walkingLeft; 
			}
		}
	}
	
	function walkingLeft(delta) {
		if (accumulator >= animationDelay) {
			accumulator = 0;
			frame--;
			if (frame < 0) { frame = 8; }
			x-= 1.3;
			if (x <= 0) { 
				sprite = spriteR;
				currentAction = walkingRight;								
			}
			
			this.draw = function(context) {
			context.drawImage(sprite, frame * 30, 0, 30, 62,
				x, g_baseline - sprite.height, finalWidth, finalHeight);
			}
		}
	}
}