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
	
	
	var emptyWindowSprite = new Image();
	emptyWindowSprite.src = "graphics/window.png";
		
	var busyWindowSprite = new Image();
	busyWindowSprite.src = "graphics/window_busy.png";
	
	this.getPuertaX = function() {
		return x + puerta.coords.x;
	}
	
	this.getDepto = function(pisoIndex, deptoIndex) {
		return estructura[pisoIndex][deptoIndex];
	}
	
	this.getMyStructure = estructura;
	
	function getDeptoBase(x, y) {
		return {
			coords: {x: x, y: y}, 
			state: 0, 
			ocupantes:[], 
			animacion: drawEmptyFlat,
			addOcupante: function(ocupante) {
				this.ocupantes.push(ocupante);
				if (this.ocupantes.length === 1) {
					this.animacion = drawOccupiedFlat;
				}
			}
		};
	}
	
	var estructura = [];
	//Estado 0, vacío
	estructura.push([
		getDeptoBase(20,50),
		getDeptoBase(80,50)
	]);
	estructura.push([
		getDeptoBase(20,120),
		getDeptoBase(80,120)
	]);
	estructura.push([
		getDeptoBase(20,200),
		getDeptoBase(90,200)
	]);
	
	var puerta = {
		coords: {x:70, y: 0}
	}
	
	this.zOrder = 10;
	
	this.init = function() {
		game.registerMouseClick(mouseClick);
		elevator = new Elevator([{x: 10 + x, y: g_baseline - 50 },
			{x: 10 + x, y: g_baseline - 120},
			{x: 10 + x, y: g_baseline - 200}]);
		game.add(elevator);
		elevator.elevatorArrive = callbackElevator;
	}
	
	var wasoCallback;
	function callbackElevator(floor) {
		wasoCallback(floor);
		//TODO: Otras acciones de building
	}
	
	this.callElevator = function (floor, callback) {
		//elevator.elevatorArrive = callback;
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
	
	this.update = function(delta) {
	}
	
	function drawEmptyFlat(context, depto) {
		context.drawImage(emptyWindowSprite, depto.coords.x + x, g_baseline - depto.coords.y);
	}
	
	function drawOccupiedFlat(context, depto) {
		context.drawImage(busyWindowSprite, depto.coords.x + x, g_baseline - depto.coords.y);
	}
	
	this.draw = function(context) {
		context.drawImage(buildingSprite, x, topLine);
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				estructura[piso][depto]["animacion"](context, estructura[piso][depto]);		
			}
		}
	}
}