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
			for (var i = 0; i < self.ocupantes.length; i++) {
				self.ocupantes[i].draw(context, i);
			}
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
	[{data: [[createDepto(50,140),createDepto(140,140)],
			  [createDepto(50,220),createDepto(150,220)],
			  [createDepto(30,300),createDepto(140,300)]],
	   door: {coords: {x:150, y: 0}}},
	  {data: [[createDepto(50,140),createDepto(140,140)],
			  [createDepto(50,220),createDepto(150,220)],
			  [createDepto(30,300),createDepto(140,300)]],
	   door: {coords: {x:20, y: 0}}},
	  {data: [[createDepto(50,140),createDepto(140,140)],
			  [createDepto(50,220),createDepto(150,220)],
			  [createDepto(30,300),createDepto(140,300)]],
	   door: {coords: {x: 100, y: 0}}}
   ];

var prefabPeople = 
	[{id: 0, 
		tshirt: "b", 
		pants: "b",
		head: 2,
		isFemale: false},
	{id: 1, 
		tshirt: "r", 
		pants: "p",
		head: 2,
		isFemale: true},
	{id: 2,
		tshirt: "b", 
		pants: "b",
		head: 2,
		isFemale: false},
	{id: 3,
		tshirt: "r", 
		pants: "p",
		head: 2,
		isFemale: true},
	{id: 4,
		tshirt: "b", 
		pants: "b",
		head: 2,
		isFemale: false},
	{id: 5,
		tshirt: "r", 
		pants: "p",
		head: 2,
		isFemale: true},
	{id: 6,
		tshirt: "b", 
		pants: "b",
		head: 2,
		isFemale: false}];

		
var levels = [
	{
		buildings:
			[createBuilding(40, 0), createBuilding(430, 2)],
		
		wasos:
			//createWaso(startX, walkSpeed, layer, direction, index) 
			//los pares son guasos
			[createWaso(200, 50.3, 13, 1, 0), createWaso(300, 40.3, 13, -1, 1),
			createWaso(100, 50.3, 13, 1, 2), createWaso(35, 40.3, 13, -1, 3),
			createWaso(20, 50.3, 13, 1, 4), createWaso(350, 40.3, 13, -1, 5),
			createWaso(230, 10.3, 13, 1, 6)], 
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
