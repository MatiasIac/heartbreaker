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
		building.setMyStructure(getStructure(0));
		buildings.add(building);

		building = new Building(520);
		building.setMyStructure(getStructure(0));
		buildings.add(building);
		
		buildings.zOrder = 1;
		
		var waso = new Waso(buildings.get(0), 1, 2);
	
		game.add(waso);
		game.add(buildings);
		game.add(heartCounter);

		game.sortObjects();
	};
}