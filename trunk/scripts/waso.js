function Waso(characteristics) {
	var factor = 1;
	var self = this;

	var x = characteristics.startX;
	var chars = characteristics;
	
	var accumulator = 0;
	var frame = 0;
	var animationDelay = 0.08;
	
	//this.building = characteristics.myBuilding;
	//this.piso = characteristics.pisoIndex;
	//this.depto = characteristics.dptoIndex;

	var sprite;
	var spriteL = new Image();
	var spriteR = new Image();
	
	if (characteristics.isFemale) {
		spriteL.src = "graphics/sprite_f_l.png";
		spriteR.src = "graphics/sprite_f_r.png";
	} else {
		spriteL.src = "graphics/sprite_m_l.png";
		spriteR.src = "graphics/sprite_m_r.png";
	}
	
	this.init = function() {
		sprite = spriteR;	
		currentAction = wander;
		//para testing; currentAction = waitingElevator;
	}
	
	this.visible = true;
	
	this.update = function(delta) {				
		accumulator += delta;
		currentAction(delta);
	}
	
	this.draw = function(context) {
		context.drawImage(sprite, frame * 35, 0, 35, 62,
			x, g_baseline - sprite.height, 35, 62);
		context.save();
			context.fillStyle = "rgb(0,0,0)";
			context.fillText("id: " + chars.id, x + (35 / 2),
				g_baseline - (sprite.height + 5));
		context.restore();
	}
	
	var currentAction = function(delta) {};
	
	function goHome(delta) {
		puertaX = self.building.getPuertaX();
		
		if (x < puertaX) {
			factor = 1;
		} else {
			factor = -1;
		}
		
		x += chars.walkSpeed * factor * delta;
		walk(delta, factor);
		var threshold = 10;
		
		if (Math.abs(x - puertaX) < threshold) {
			currentAction = waitingElevator;
		}		
	}
	
	function wander(delta) {
		//TODO: Hacer random o por parametro
		
		if (x < 0) {
			factor = 1;
		} else if (x > 600) {
			factor = -1;
		}
		
		x += chars.walkSpeed * factor * delta;
		walk(delta, factor);
	}
	
	function waitingElevator(delta) {
		callElevator(0, goUpHomeCallback);
	};
	
	function goUpHomeCallback(currentFloor) {
		callElevator(self.piso, enterHomeCallback);
	}
	
	function enterHomeCallback(currentFloor) {
		deptoObject = self.building.getDepto(self.piso, self.depto);
		deptoObject.addOcupante(self);
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
	
	this.zOrder = 100;
}