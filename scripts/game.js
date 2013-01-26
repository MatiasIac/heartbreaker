function Game() {
	this.run = function () {
		var game = new MinFwkGame();
		game.init("canvas");
		
		var waso = new Waso();
		game.add(waso);
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 7;
		heartCounter.totalLives = 1;
		game.add(heartCounter);
		
		game.sortObjects();
	};
}