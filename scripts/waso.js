function Waso(characteristics) {

	this.isInside = false;
	this.insideTime = 0;
	this.insideTimeOut = 0;
	
	var direction = characteristics.direction;
	var self = this;

	var x = characteristics.startX;
	var chars = characteristics;
	
	var accumulator = 0;
	var frame = 0;
	var animationDelay = 0.08;

	var sprite;
	var spriteL = new Image();
	var spriteR = new Image();
	
	if (characteristics.isFemale) {
		spriteL.src = "graphics/0/f_" + characteristics.tshirt + "_" + characteristics.pants + "_l.png";
		spriteR.src = "graphics/0/f_" + characteristics.tshirt + "_" + characteristics.pants + "_r.png";
	} else {
		spriteL.src = "graphics/1/m_" + characteristics.tshirt + "_" + characteristics.pants + "_l.png";
		spriteR.src = "graphics/1/m_" + characteristics.tshirt + "_" + characteristics.pants + "_r.png";
	}
	
	this.init = function() {
		sprite = spriteR;	
		currentAction = wander;
		//para testing; currentAction = waitingElevator;
	}
	
	this.visible = true;
	this.state = 0; 
	this.isHornerator = false;
	
	this.update = function(delta) {				
		accumulator += delta;
		currentAction(delta);
	}
	
	this.drawInFlat = function(context) {
		if (self.side == 2) {
			sprite = spriteL;
		} else {
			sprite = spriteR;
		}
		//Estamos dentro de la casa
		context.drawImage(sprite, 6 * 35, 0, 35, 62, (self.depto.building.buildingXCoord + self.depto.coords.x + 10) + (self.side - 1.5) * 22 , g_baseline - (self.depto.coords.y), 35, 62);
	}
	
	this.draw = function(context) {

		context.drawImage(sprite, frame * 35, 0, 35, 62,
			x, g_baseline - sprite.height + characteristics.layer, 35, 62);
		/*context.save();
			if (self.isHornerator) {
				context.fillStyle = "rgb(0,255,0)";
			} else if (self.pataeLana) {
				context.fillStyle = "rgb(255,0,0)";
			} else {
				context.fillStyle = "rgb(0,0,255)";
			}
			context.fillText("id: " + chars.id, x + (35 / 2),
				g_baseline - (sprite.height + 5));
		context.restore();
		*/
	}
	
	var currentAction = function(delta) {};
	
	function goHome(delta) {
		puertaX = self.depto.building.getPuertaX();
		
		if (x < puertaX) {
			direction = 1;
		} else {
			direction = -1;
		}
		
		x += chars.walkSpeed * direction * delta;
		walk(delta, direction);
		var threshold = 10;
		
		if (Math.abs(x - puertaX) < threshold) {

			
			self.state = 1;
			self.inside = true;
			self.insideTime = new Date().getTime();
			self.insideTimeOut = self.insideTime + Math.floor(3000 + Math.random() * 5000);  
			currentAction = inHouse;
			//currentAction = idleInHouse;
		}		
	}
	
	//Waso actions
	function inHouse(delta) {
		self.depto.addOcupante(self);
		self.visible = false;
		currentAction = idleInHouse;
	}
	
	this.callCheater = function(other) {
		self.depto = other.depto;
		currentAction = goHome;
	}
	
	function getOut(delta) {
		self.depto.removeOcupante(self);
		self.visible = true;
		self.inside = false;
		currentAction = wander;
		self.state = 2;
	}
	
	function idleInHouse (delta) {
		walk(delta, 1);
	}
	
	function wander(delta) {
		if (x < 0) {
			direction = 1;
		} else if (x > 600) {
			direction = -1;
		}
		
		x += chars.walkSpeed * direction * delta;
		walk(delta, direction);
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
	//END Waso actions
	
	this.setAction = function (action) {
		switch (action) {
			case 0:
				currentAction = goHome;
				break;
			case 1:
				currentAction = wander;
				break;
			case 2:
				currentAction = idle;
				break;
			case 3:
				currentAction = getOut;
		}
	}
	
	this.zOrder = 1;
}