var g_baseline = 500;
var game;

function Game() {
	var self = this;
	
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		makeLevel(0);
		game.sortObjects();
	};
	
	function makeLevel(level) {
		game.removeAll();
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 7;
		heartCounter.totalLives = 1;
		game.add(heartCounter);
		
		var buildings = new Composite();
		buildings.zOrder = 10;
		
		for (var building in levels[level].buildings) {
			buildings.add(levels[level].buildings[building]);
		}
		game.add(buildings);
		var wasos = new Composite();
		wasos.zOrder = 20;
		for (var waso in levels[level].wasos) {
			wasos.add(levels[level].wasos[waso]);
		}
		game.add(wasos);
		
	}
	
}