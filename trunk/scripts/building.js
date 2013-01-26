function Building(xParam) {
	var self = this;
	var x = xParam;
	
	
	var buildingSprite = new Image();
	buildingSprite.src = "graphics/edificio.png";
	var baseline;
	
	buildingSprite.onload = function() {
		baseline = g_baseline - buildingSprite.height;
	}
	
	var windowSprite = new Image();
	windowSprite.src = "graphics/window.png";
	
	function getPisoBase(x, y) {
		return {coords: {x: x, y: y}, state: 0, ocupantes:[], animacion: drawEmptyFlat};
	}
	var estructura = [];
	//Estado 0, vacío
	estructura.push([
		getPisoBase(20,20),
		getPisoBase(80,20)
	]);
	estructura.push([
		getPisoBase(20,80),
		getPisoBase(80,80)
	]);
	estructura.push([
		getPisoBase(20,170),
		getPisoBase(80,170)
	]);
	
	puerta = {
		coords: {x:70, y: 0}
	}
	
	//var sprite = new Image();
	//sprite.src = "...";

	this.zOrder = 100;
	
	this.init = function() {
	
	
	}
	
	this.visible = true;
	
	this.update = function(delta) {
	}
	
	function drawEmptyFlat(context, depto) {
		context.drawImage(windowSprite, depto.coords.x + x, depto.coords.y + baseline);
	}
	
	this.draw = function(context) {
		context.drawImage(buildingSprite, x, baseline);
		for (var piso in estructura) {
			for (var depto in estructura[piso]) {
				estructura[piso][depto]["animacion"](context, estructura[piso][depto]);		
			}
		}
	}
}