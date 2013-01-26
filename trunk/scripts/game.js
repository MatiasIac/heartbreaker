var g_baseline = 500;
var game;

function Game() {
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		
		
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 7;
		heartCounter.totalLives = 1;
		
		buildings = new Composite();
		buildings.add(new Building(120));
		buildings.add(new Building(320));
		buildings.add(new Building(520));
		buildings.zOrder = 1;
		
		var waso = new Waso(buildings.get(0), 1, 2);
	
		game.add(waso);
		game.add(buildings);

		game.add(heartCounter);
		
		/*var elevator = new Elevator([{x: 100, y: 250},
			{x: 100, y: 200},
			{x: 100, y: 150}]);
		game.add(elevator);*/

		game.sortObjects();
	};
}