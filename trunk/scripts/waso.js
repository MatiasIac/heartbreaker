function Waso(buildingParam, deptoParam, pisoParam) {
	var self = this;

	var x = 10;
	var accumulator = 0;
	var frame = 0;
	var finalWidth = 30;
	var finalHeight = 62;
	var animationDelay = 0.04;
	
	this.building = buildingParam;
	this.depto = deptoParam; 
	this.piso = pisoParam;
	
	
	var sprite;
	var spriteL = new Image();
	spriteL.src = "graphics/sprite_personaje_l.png";
	
	var spriteR = new Image();
	spriteR.src = "graphics/sprite_personaje_r.png";
	
	
	this.zOrder = 100;
	
	this.init = function() {
		x = 10;
		sprite = spriteR;
		//currentAction = walkingRight;		
		currentAction = goHome;
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
	
	function goHome(delta) {
		var factor;
		puertaX = self.building.getPuertaX();
		
		if (x < puertaX) {
			factor = 1;
		} else {
			factor = -1;
		}
		
		x += 1.3 * factor;
		walk(delta, factor)
	}
	
	
	function walk(delta, direction) {
		if (accumulator >= animationDelay) {
			
			accumulator = 0;
			frame += direction;
			var animationEnd = 8;
			
			if (frame > animationEnd) { frame = 0; }
			if (frame < 0) { frame = animationEnd; }
			
			if (direction > 0) {
				sprite = spriteR;
			} else {
				sprite = spriteL;
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