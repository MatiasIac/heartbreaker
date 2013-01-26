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


var prefabBuildings = 
	[{data: [[createDepto(20,50),createDepto(80,50)],
			  [createDepto(20,120),createDepto(80,120)],
			  [createDepto(20,200),createDepto(90,200)]],
	   door: {coords: {x:150, y: 0}}},
	  {data: [[createDepto(20,50),createDepto(80,50)],
			  [createDepto(20,120),createDepto(80,120)],
			  [createDepto(20,200),createDepto(90,200)]],
	   door: {coords: {x:20, y: 0}}},
	  {data: [[createDepto(20,50),createDepto(80,50)],
			  [createDepto(20,120),createDepto(80,120)],
			  [createDepto(40,200),createDepto(90,200)]],
	   door: {coords: {x: 100, y: 0}}}
   ];

var prefabPeople = 
	[{id: 0, 
		tshirt: 1, 
		pants: 0,
		head: 2,
		isFemale: false},
	{id: 1, 
		tshirt: 1, 
		pants: 0,
		head: 2,
		isFemale: true},
	{id: 2,
		tshirt: 1, 
		pants: 0,
		head: 2,
		isFemale: false},
	{id: 3,
		tshirt: 1, 
		pants: 0,
		head: 2,
		isFemale: true}];   

		
var levels = [
	{
		buildings:
			[createBuilding(70, 0), createBuilding(480, 2)],
		
		wasos:
			//createWaso(startX, walkSpeed, layer, direction, index) 
			//los pares son guasos
			[createWaso(200, 50.3, 13, 1, 0), createWaso(300, 40.3, 13, -1, 1)], 
		hornerators: 1
	}
];

function createBuilding(x, index){
	var building = new Building(x);
	var myStruct = prefabBuildings[index];
	building.setMyStructure(myStruct.data);
	building.setMyDoor(myStruct.door);
	return building;
}

function createWaso(startX, walkSpeed, layer, direction, index) {
	var caracteristicas = prefabPeople[index];
	caracteristicas.startX = startX;
	caracteristicas.direction = direction;
	caracteristicas.walkSpeed = walkSpeed;
	caracteristicas.layer = layer;
	var waso = new Waso(caracteristicas); 
	return waso;
}
