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
		building.setMyStructure(getStructure(0));
		
		buildings.add(building);
		
		building = new Building(320);
		building.setMyStructure(getStructure(1));
		buildings.add(building);

		building = new Building(520);
		building.setMyStructure(getStructure(2));
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