function Waso(myBuild, characteristics) {
	var self = this;

	var x = characteristics.startingX;
	var chars = characteristics;
	
	var accumulator = 0;
	var frame = 0;
	var animationDelay = 0.08;
	
	this.building = myBuild;
	this.piso = characteristics.pisoIndex;
	this.depto = characteristics.dptoIndex;

	var sprite;
	var spriteL = new Image();
	spriteL.src = "graphics/sprite_f_l.png";
	var spriteR = new Image();
	spriteR.src = "graphics/sprite_f_r.png";
	
	this.init = function() {
		sprite = spriteR;	
		currentAction = goHome;
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