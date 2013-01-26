function createDepto(x, y) {
	return new function(){
		var self = this;
		
		var emptySprite = new Image();
		var busySprite = new Image();
		emptySprite.src = "graphics/window.png";
		busySprite.src = "graphics/window_busy.png";
		
		this.coords = {x: x, y: y};
		this.state = 0;
		this.ocupantes = [];
		this.owners = [];
		
		this.drawOccupiedFlat = function(context, depto, buildingX) {
			context.drawImage(busySprite, depto.coords.x + buildingX, 
				g_baseline - depto.coords.y);
		};
		
		this.drawEmptyFlat = function(context, depto, buildingX) {
			context.drawImage(emptySprite, depto.coords.x + buildingX, 
				g_baseline - depto.coords.y);
		};
		
		this.animacion = self.drawEmptyFlat;
		
		this.addOcupante = function(ocupante) {
			self.ocupantes.push(ocupante);
			if (self.ocupantes.length === 1) {
				self.animacion = self.drawOccupiedFlat;
			}
		}
	};
}

var s = [{ data: [[createDepto(20,50),createDepto(80,50)],
				  [createDepto(20,120),createDepto(80,120)],
				  [createDepto(20,200),createDepto(90,200)]]},
		  {data: [[createDepto(20,50),createDepto(80,50)],
				  [createDepto(20,120),createDepto(80,120)],
				  [createDepto(20,200),createDepto(90,200)]]},
		  {data: [[createDepto(20,50),createDepto(80,50)],
				  [createDepto(20,120),createDepto(80,120)],
				  [createDepto(40,200),createDepto(90,200)]]
	}];

function getStructure(i) {
	var data = s[i].data;
	
	return data;
}