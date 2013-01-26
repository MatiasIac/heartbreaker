function Waso(characteristics) {
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
	
	this.draw = function(context, index) {
		if (index !== undefined) {
			//Estamos dentro de la casa
			context.drawImage(sprite, frame * 35, 0, 35, 62,
				(self.depto.building.buildingXCoord + self.depto.coords.x), 
				g_baseline - (self.depto.coords.y), 35, 62);
		} else {
			context.drawImage(sprite, frame * 35, 0, 35, 62,
				x, g_baseline - sprite.height, 35, 62);
			context.save();
				context.fillStyle = "rgb(0,0,0)";
				context.fillText("id: " + chars.id + " " + self.isHornerator, x + (35 / 2),
					g_baseline - (sprite.height + 5));
			context.restore();
		}
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
			currentAction = inHouse;
		}		
	}
	
	//Waso actions
	function inHouse(delta) {
		self.depto.addOcupante(self);
		self.visible = false;
		currentAction = idleInHouse;
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
		}
	}
	
	this.zOrder = 1;
}