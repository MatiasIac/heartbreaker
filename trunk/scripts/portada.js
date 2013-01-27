function Portada() {
	var self = this;
	
	var corazon = new Image();
	corazon.src = "graphics/portada.png";
	var gameTitle = new Image();
	gameTitle.src = "graphics/gameTitle.png";

	var startButton = new Image();
	startButton.src = "graphics/clickbutton.png";
	
	var beatSound = new Audio();
	beatSound.src = "fx/heartBeat.mp3";
	
	var counter = 0;
	
	this.zOrder = 100;
	this.init = function() { 
		beatSound.volume = 1;
		beatSound.loop = true;
		beatSound.play(); 
		game.registerMouseClick(portadaClick);
	}
	
	function portadaClick(mx, my) {
		var rectWindow = new Rectangle().startupRectangle(
			210,400, 450, 170);
		
		var rectClick = new Rectangle().startupRectangle(mx, my, 10, 10);
		
		if (rectClick.intersects(rectWindow)) {
			game.unregisterMouseClick(portadaClick);
			self.startGameRef();
		}

	}
	
	this.visible = true;
	this.startGameRef = function() {};
	
	var beater = function () {};
	var beaterCounter = 0;
	var beatSwitch = 0;
	
	this.update = function(delta) {
		counter += delta;
		if (counter >= 0.95) {
			counter = 0;
			beater = function () {
				beaterCounter += delta;
				if (beaterCounter >= 0.1) {
					beaterCounter = 0;
					doBeat();
				}
			}
		}
		
		beater();
		
		angle-=1;
	}
	
	function doBeat() {
		sWidth += 15;
		sHeight += 15;
		
		beatSwitch++;
		if (beatSwitch >= 4) {
			sWidth -= 60;
			sHeight -= 60;
			beatSwitch = 0;
			beater = function () {};
		}
	}
	
	var sWidth = 500;
	var sHeight = 600;
	var centerX = sWidth * 0.5;
	var centerY = sHeight * 0.5;
	var angle = 0;
	
	this.draw = function(context) {
		context.save();
			context.translate(800 * 0.5, 600 * 0.5);
			context.rotate(_global_DegreeToRadians(angle));
			context.translate(-centerX, -centerY);
			context.drawImage(corazon, 0, 0, sWidth, sHeight);
		context.restore();
		
		context.drawImage(gameTitle, 0,0);
		context.drawImage(startButton, 210,400);
		
		context.save();
			context.font = "10pt arial";
			context.fillStyle = "rgb(255,255,255)";
			context.fillText("In this neighborhood you can find some cheaters couples.", 10, 10);
			context.fillText("Wait for each one to visit his home and then, one or many of them could sneak on other home.", 10, 24);
			context.fillText("Click on the home with the cheater to win.", 10, 38);
		context.restore();
	}
}