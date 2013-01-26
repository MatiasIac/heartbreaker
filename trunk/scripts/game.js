var g_baseline = 560;
var game;

function Game() {
	var self = this;
	var wasos;
	
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		
		game.add(new Misc());
		
		makeLevel(0);
		
		var wachisList = wasos.getComponents();
		for (var waso in wachisList) {
			currentWaso = wachisList[waso];
			if (currentWaso.depto) {
				currentWaso.setAction(0);
				break;
			}
		}
	
		game.add(self);
		game.sortObjects();
	};
	
	function makeLevel(level) {
		game.removeAll();
		
		var heartCounter = new HeartCounter();
		heartCounter.totalHeart = 0;
		heartCounter.totalLives = 0;
		game.add(heartCounter);
		
		var buildings = new Composite();
		buildings.zOrder = 10;
		
		for (var building in levels[level].buildings) {
			buildings.add(levels[level].buildings[building]);
		}
		game.add(buildings);
		wasos = new Composite();
		wasos.zOrder = 100;
				
		for (var waso in levels[level].wasos) {
			wasos.add(levels[level].wasos[waso]);
		}
		
		//Contar los pata de lana
		var lanas = levels[level].hornerators;
		heartCounter.totalHeart = lanas + 1;
		
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
		
		
		//Consigue una lista de todos los wasos, en una copia.
		wasosAsignables = wasos.getComponents().slice(0);
		
		//Buscar lista completa de departamentos
		var allDeptos = [];
		myBuildings = buildings.getComponents();
		for (var i = 0; i < myBuildings.length; i++) {
			allDeptos = allDeptos.concat(myBuildings[i].getDeptos());
		}
		
		var horneators = []; 
		//A esta altura, alldeptos tiene todos los departamentos.
		var deptosAsignables = (wasosAsignables.length - lanas) / 2;
		var chosenDeptos = [];
		for (var i = 0; i < deptosAsignables; i++) {
			var chosenNumber = Math.floor(Math.random() * allDeptos.length);
			var chosen = allDeptos.splice(chosenNumber, 1)[0];
			chosenDeptos.push(chosen);	
			var personasAsignadas = 0;
			while (personasAsignadas < 2) {
				var chosenPersonNumber = Math.floor(Math.random() * wasosAsignables.length);
				personaAsignada = wasosAsignables.splice(chosenPersonNumber, 1)[0];
				if (personaAsignada.isHornerator) {
					horneators.push(personaAsignada);
				} else {
					personasAsignadas++;
					chosen.owners.push(personaAsignada);
					personaAsignada.depto = chosen;
				}
			}
		}
		
		//Asignar por lo menos, un pata de lana a uno de los elementos del par
		for (var i = 0; i < horneators.length; i++) {
			var chosenDpto = Math.floor(Math.random() * chosenDeptos.length);
			var c = chosenDeptos.splice(chosenDpto, 1)[0];
			c.owners[0].pataeLana = horneators[i];
		}
	
		game.add(wasos);	
	}
	
	this.draw = function(context) {
	}
	
	this.init = function() {
	
	}
	
	this.update = function(delta) {

		
	}
		
}