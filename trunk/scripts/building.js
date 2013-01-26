function Building(xParam) {
	var self = this;
	var x = xParam;

	
	var buildingSprite = new Image();
	buildingSprite.src = "graphics/edificio.png";
	var topLine;
	
	buildingSprite.onload = function() {
		topLine = g_baseline - buildingSprite.height;
	}
	
	var windowSprite = new Image();
	windowSprite.src = "graphics/window.png";
	
	this.getPuertaX = function() {
		return x + puerta.coords.x;
	}
	function getPisoBase(x, y) {
		return {coords: {x: x, y: y}, state: 0, ocupantes:[], animacion: drawEmptyFlat};
	}
	
	var estructura = [];
	//Estado 0, vacío
	estructura.push([
		getPisoBase(20,50),
		getPisoBase(80,50)
	]);
	estructura.push([
		getPisoBase(20,120),
		getPisoBase(80,120)
	]);
	estructura.push([
		getPisoBase(20,200),
		getPisoBase(90,200)
	]);
	
	var puerta = {
		coords: {x:70, y: 0}
	}
	
	this.zOrder = 10;
	
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
		context.drawImage(windowSprite, depto.coords.x + x, g_baseline - depto.coords.y);
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