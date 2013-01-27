function Building(xParam) {
	var self = this;
	var x = xParam;
	var elevator;
	
	var buildingSprite = new Image();
	buildingSprite.src = "graphics/edificio3.png";
	var topLine;
	
	buildingSprite.onload = function() {
		topLine = g_baseline - buildingSprite.height;
	}
	
	this.buildingXCoord = xParam;
	
	this.getPuertaX = function() {
		return x + puerta.coords.x;
	}
	
	this.getDepto = function(pisoIndex, deptoIndex) {
		return estructura[pisoIndex][deptoIndex];
	}
	
	var estructura = [];
	var puerta = {};
	
	this.setMyStructure = function (structure) {
		estructura = structure;
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				estructura[piso][depto].state = "dosAfuera"; 
				estructura[piso][depto].piso = piso;
				estructura[piso][depto].depto = depto;
				estructura[piso][depto].building = self;
			}
		}	
	};
	
	this.setMyDoor = function (door) {
		puerta = door;
	};
	
	this.getMyStructure = estructura;
	this.zOrder = 10;
	
	this.getDeptos = function() {
		var deptos = [];
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				deptos.push(estructura[piso][depto]);
			}
		}
		return deptos;
	}
	this.init = function() {
		game.registerMouseClick(mouseClick);
	}
	
	function mouseClick(mx, my) {
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				var rectWindow = new Rectangle().startupRectangle(
					estructura[piso][depto]["coords"].x + x,
					g_baseline - estructura[piso][depto]["coords"].y, 55, 40);
				
				var rectClick = new Rectangle().startupRectangle(mx, my, 10, 10);
				
				if (rectClick.intersects(rectWindow)) {
					var ocupantes = estructura[piso][depto]["ocupantes"];
					var isRipperThere = false;
					if (ocupantes.length === 2) {
						for (var i = 0; i < ocupantes.length; i++) {
							if (ocupantes[i].pataeLana !== undefined) {
								isRipperThere = true;
								game.stopGame(function (context) {
									context.save();
										context.fillStyle = "rgb(0,255,10)";
										context.font = "30pt arial";
										context.fillText("You found the cheater!", 130, 100);
									context.restore();
								});
							}
						}
						
						if (!isRipperThere) {
							game.stopGame(function (context) {
								context.fillStyle = "rgb(255,0,10)";
								context.font = "30pt arial";
								context.fillText("How you dare? Blaming an innocent!", 130, 100);
							});
						}
					}
					
					/*game.console.append("Piso: " + piso + ", Dpto: " + depto);
					game.console.append("Ocupantes: " + ocupantes.length + ", esta en trampa: " + isRipperThere);*/
					break;
				}
			}
		}
	}
	
	this.visible = true;
	
	this.update = function(delta) {	}
	
	this.draw = function(context) {
		//context.drawImage(buildingSprite, x, topLine);
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				estructura[piso][depto]["animacion"](context, estructura[piso][depto], x);		
			}
		}
		context.drawImage(buildingSprite, x, topLine);
	}
}