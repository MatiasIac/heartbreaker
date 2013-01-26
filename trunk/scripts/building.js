function Building(xParam) {
	var self = this;
	var x = xParam;
	var elevator;
	
	var buildingSprite = new Image();
	buildingSprite.src = "graphics/edificio.png";
	var topLine;
	
	buildingSprite.onload = function() {
		topLine = g_baseline - buildingSprite.height;
	}
	
	this.getPuertaX = function() {
		return x + puerta.coords.x;
	}
	
	this.getDepto = function(pisoIndex, deptoIndex) {
		return estructura[pisoIndex][deptoIndex];
	}
	
	var estructura = [];
	this.setMyStructure = function (structure) {
		estructura = structure;
	};
	
	this.getMyStructure = estructura;
	
	var puerta = {
		coords: {x:70, y: 0}
	}
	
	this.zOrder = 10;
	
	this.init = function() {
		game.registerMouseClick(mouseClick);
		
		var elevatorElements = [];
		
		for (var i = 0; i < estructura.length; i++) {
			elevatorElements.push({x: 10 + x, y: g_baseline - (50 * i) });
		}
		
		elevator = new Elevator(elevatorElements);
		game.add(elevator);
		elevator.elevatorArrive = callbackElevator;
	}
	
	var wasoCallback;
	function callbackElevator(floor) {
		wasoCallback(floor);
		//TODO: Otras acciones de building
	}
	
	this.callElevator = function (floor, callback) {
		wasoCallback = callback;
		elevator.moveTo(floor);
	};
	
	function mouseClick(mx, my) {
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				var rectWindow = new Rectangle().startupRectangle(
					estructura[piso][depto]["coords"].x + x,
					g_baseline - estructura[piso][depto]["coords"].y, 55, 40);
				
				var rectClick = new Rectangle().startupRectangle(mx, my, 10, 10);
				
				if (rectClick.intersects(rectWindow)) {
					game.console.append("Piso: " + piso + ", Dpto: " + depto);
					break;
				}
			}
		}
	}
	
	this.visible = true;
	
	this.update = function(delta) {	}
	
	this.draw = function(context) {
		context.drawImage(buildingSprite, x, topLine);
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				estructura[piso][depto]["animacion"](context, estructura[piso][depto], x);		
			}
		}
	}
}