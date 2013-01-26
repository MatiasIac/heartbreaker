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
		
		//Contar los pata de lana
		var lanas = levels[level].hornerators;
		
		//Asignar el pata de lana
		for (var i = 0; i < lanas; i++) {
			var choise = Math.floor((Math.random() * wasos.count()));
			if (!wasos.get(choise).isHornerator) {
				wasos.get(choise).isHornerator = true;
			} else {
				choise = 0;
				for (var j = 0; j < wasos.count() - 1; j++) {
					if (!wasos.get(j).isHornerator) {
						wasos.get(j).isHornerator = j;
						break;
					}
				}
			}
		}
		//Asignar por lo menos, un pata de lana a uno de los elementos del par
		
		
		game.add(wasos);
		
		//Contar todos los dptos
		//Contar todas las personas
		
		//Asignar personas a dptos en pares menos los patas de lana
		

	}
	
}