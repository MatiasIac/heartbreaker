var g_baseline = 545;
var game;

function Game() {
	var timer = 0;
	var self = this;
	var wasos;
	var usedDeptos = [];
	
	this.run = function () {
		game = new MinFwkGame();
		game.init("canvas");
		
		game.add(new Misc());
		
		makeLevel(0);
		
		game.add(self);
		
		game.add(new FrontMisc());
		
		game.sortObjects();
	};
	
	function makeLevel(level) {
		game.removeAll();
		
		var heartCounter = new HeartCounter();
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
		heartCounter.totalHeart = lanas;
		heartCounter.totalLives = 1;
		
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
					personaAsignada.side = 2;
				} else {
					personasAsignadas++;
					personaAsignada.side = personasAsignadas;
					chosen.owners.push(personaAsignada);
					personaAsignada.depto = chosen;
				}
			}
		}
		usedDeptos = chosenDeptos.slice(0);
		
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
		timer -= delta;
		if (timer < 0) {
			timer = 0.5 + Math.random() * 1.0;
			self.actOnSomeGuy();
		}		
	}
	
	this.actOnSomeGuy = function() {
		var chosenDepto = usedDeptos[Math.floor(Math.random() * usedDeptos.length)];
		switch (chosenDepto.state) {
			case "dosAfuera":
				chosenDepto.owners[0].setAction(0);		
				chosenDepto.state = "subePrimero";
				break;
			case "subePrimero":
				var ownerActual = chosenDepto.owners[0];
				if (ownerActual.inside && ownerActual.insideTimeOut < new Date().getTime()) {
					ownerActual.setAction(3);
					chosenDepto.state = "bajaPrimero";
				}
				
				break;
			case "bajaPrimero":
				chosenDepto.owners[1].setAction(0);
				chosenDepto.state = "subeSegundo";
				break;
			case "subeSegundo":
				var ownerActual = chosenDepto.owners[1];
				if (ownerActual.inside && ownerActual.insideTimeOut < new Date().getTime()) {
					ownerActual.setAction(3);
					chosenDepto.state = "bajaSegundo";
				}
				break;
			case "bajaSegundo":
				chosenDepto.owners[0].setAction(0);
				chosenDepto.state = "vuelveASubirPrimero";
				break;
			case "vuelveASubirPrimero":
				var ownerActual = chosenDepto.owners[0];
				if (ownerActual.inside) {
					if (ownerActual.pataeLana) {
						ownerActual.pataeLana.callCheater(ownerActual);
						chosenDepto.state = "esperandoPataDeLana";
					} else {
						//llama a casa a la pareja
						chosenDepto.owners[1].setAction(0);
						chosenDepto.state = "esperandoPareja";
					}
				}
				break;

		}
	}
		
}