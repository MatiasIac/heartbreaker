function Waso(buildingParam, deptoParam, pisoParam) {
	var self = this;

	var x = 10;
	var accumulator = 0;
	var frame = 0;
	var finalWidth = 35;
	var finalHeight = 62;
	var animationDelay = 0.08;
	
	this.building = buildingParam;
	this.piso = pisoParam;
	this.depto = deptoParam;
	
	this.targetBuilding;
	this.targetPiso;
	this.targetDepto;

	
	var sprite;
	var spriteL = new Image();
	spriteL.src = "graphics/sprite_f_l.png";
	
	var spriteR = new Image();
	spriteR.src = "graphics/sprite_f_r.png";
	
	
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
		context.drawImage(sprite, frame * 35, 0, 35, 62,
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
		
		x += 50.3 * factor * delta;
		walk(delta, factor);
		var threshold = 10;
		
		if (Math.abs(x - puertaX) < threshold) {
			currentAction = waitingElevator;
		}		
	}
	
	function waitingElevator(delta) {
		callElevator(0, goUpHomeCallback);
	};
	
	function goUpHomeCallback(currentFloor) {
		callElevator(self.piso, enterHomeCallback);
	}
	
	function enterHomeCallback(currentFloor) {
		deptoObject = self.building.getDepto(self.piso, self.depto);
		deptoObject.ocupantes.push(self);
	}
	
	function callElevator(floor, callback) {
		self.visible = false;
		self.building.callElevator(floor, callback);  
		currentAction = idle;
	}
		
	function idle(delta) {
	};
		
	function walk(delta, direction) {
		if (accumulator >= animationDelay) {
			
			accumulator = 0;
			frame += direction;
			var animationEnd = 7;
			
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