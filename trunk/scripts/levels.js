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
				for (var i = 0; i < self.ocupantes.length; i++) {
					self.ocupantes[i].drawInFlat(context);
				}
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
		
		this.removeOcupante = function() {
			self.ocupantes.pop();
			if (self.ocupantes.length === 0) {
				self.animacion = self.drawEmptyFlat;
			}
		}
	};
}


var prefabBuildings = 
	[{data: [[createDepto(60,150),createDepto(165,150)],
			  [createDepto(60,235),createDepto(170,235)],
			  [createDepto(55,315),createDepto(180,320)]],
	   door: {coords: {x:150, y: 0}}},
	  {data: [[createDepto(50,140),createDepto(140,140)],
			  [createDepto(50,220),createDepto(150,220)],
			  [createDepto(30,300),createDepto(140,300)]],
	   door: {coords: {x:20, y: 0}}},
	  {data: [[createDepto(50,140),createDepto(140,140)],
			  [createDepto(50,220),createDepto(150,220)],
			  [createDepto(30,300),createDepto(140,300)]],
	   door: {coords: {x: 100, y: 0}}},
	   {data: [[createDepto(60,150),createDepto(165,150)],
			  [createDepto(60,235),createDepto(170,235)],
			  [createDepto(55,315),createDepto(180,320)]],
	   door: {coords: {x:150, y: 0}}}
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
		tshirt: "y", 
		pants: "p",
		head: 2,
		isFemale: true},
	{id: 4,
		tshirt: "b", 
		pants: "r",
		head: 2,
		isFemale: false},
	{id: 5,
		tshirt: "y", 
		pants: "b",
		head: 2,
		isFemale: true},
	{id: 6,
		tshirt: "r", 
		pants: "r",
		head: 2,
		isFemale: false},
	{id: 7,
		tshirt: "d", 
		pants: "d",
		head: 2,
		isFemale: false}];

		
var levels = [
	{
		buildings:
			[createBuilding(40, 0), createBuilding(430,3)],
		
		wasos:
			//createWaso(startX, walkSpeed, layer, direction, index) 
			//los pares son guasos
			[createWaso(200, 50.3, -5, 1, 0), createWaso(300, 54.3, -3, -1, 1),
			createWaso(100, 70.3, 1, 1, 4), createWaso(35, 83.3, 3, 2, 3),
			createWaso(60, 60.3, 5, 1, 7), createWaso(540, 65.3, 8, -1, 5),
			createWaso(260, 80.3, 22, 1, 6)], 
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
