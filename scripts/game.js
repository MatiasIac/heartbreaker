var g_baseline = 500;
var game;

function Game() {
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		
		var waso = new Waso();
		game.add(waso);
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 7;
		heartCounter.totalLives = 1;
		
		buildings = new Composite();
		buildings.add(new Building(120));
		buildings.add(new Building(320));
		buildings.add(new Building(520));
		
		game.add(buildings);
		game.add(heartCounter);
		

		game.sortObjects();
	};
}