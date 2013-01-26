var g_baseline = 500;
var game;

function Game() {
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 7;
		heartCounter.totalLives = 1;
		
		var buildings = new Composite();
		var building = new Building(120);
		var myStruct = getStructure(0);
		building.setMyStructure(myStruct.data);
		building.setMyDoor(myStruct.door);
		buildings.add(building);
		
		building = new Building(320);
		myStruct = getStructure(1);
		building.setMyStructure(myStruct.data);
		building.setMyDoor(myStruct.door);
		buildings.add(building);

		building = new Building(520);
		myStruct = getStructure(2);
		building.setMyStructure(myStruct.data);
		building.setMyDoor(myStruct.door);
		buildings.add(building);
		
		buildings.zOrder = 1;
		
		var waso = new Waso({
			id: 2, startingX: 800,
			tshirt: 1, pants: 0,
			head: 2, isHorned: true,
			myBuilding: buildings.get(0),
			dptoIndex: 0, pisoIndex: 2,
			isFemale: true
		});
		
		game.add(waso);
		
		waso = new Waso({
			id: 3, startingX: 0,
			tshirt: 1, pants: 0,
			head: 2, isHorned: true,
			myBuilding: buildings.get(2),
			dptoIndex: 0, pisoIndex: 2,
			isFemale: false
		});
	
		game.add(waso);
		game.add(buildings);
		game.add(heartCounter);

		game.sortObjects();
	};
}