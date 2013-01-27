function Game() {
	var self = this;
	var pictureBag = [];
	var sacrificied = new Image();
	var heart = new Image();
	var powerBar = new Image();
	var bloodShot = new Image();
	var knife = new Image();
	var knifeAngle = 0;
	var hurt = new Audio();
	var kill = new Audio();
	var heartBeat = new Audio();
	hurt.src = "fx/hurt.wav";
	kill.src = "fx/kill.wav";
	heartBeat.src = "fx/heartBeat.wav";
	
	function loadSacrified() {
		for (var i = 0; i < 24; i++) {
			var s = new Image();
			s.src = "graphics/sacrificied" + i + ".png";
			pictureBag.push(s);
		}
		selectRandomImage();
	}
	
	function selectRandomImage() {
		var selected = Math.floor(Math.random() * pictureBag.length);
		sacrificied = pictureBag[selected];
	}
	
	loadSacrified();
	
	heart.src = "graphics/heart.png";
	powerBar.src = "graphics/bar.png";
	bloodShot.src = "graphics/bloodShot.png";
	knife.src = "graphics/knife.png";
	
	var clock = new Image();
	clock.src = "graphics/reloj.png";
	
	var sacX = 200;
	var sacY = 80;
	var heartX = 250;
	var heartY = 70;
	
	var x;
	var y;
	
	var knifeX = 250;
	var knifeY = 70;
	
	var shakeX = 0;
	var shakeY = 0;
	
	var knifeOffsetX = 0;
	var knifeOffsetY = 0;
	var powerAcc = 150;
	var accumulator = 0;
	var levelFriction = 2;
	var points = 0;
	var lastKeyPressed = 0;
	var showBlood = false;
	var showMouseEnabled = true;
	var timerValue = 60;
	var accTimer = 0;
	var canvas;
	
	this.init = function() {
		currentUpdater = normalUpdate;
		
		hurt.volume = 0.8;
		kill.volume = 0.8;
		heartBeat.volume = 1;
		
		if (document.addEventListener) {
			document.addEventListener("keypress", keyPress , false);
			canvas = document.getElementById("canvas");
			canvas.addEventListener("click", onClick , false);
			canvas.addEventListener("mousemove", updateMouse, false);
		}
	}
	
	function updateMouse(e) {
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		} else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
	}
	
	function onClick() {
		if (showMouseEnabled) {
			if (powerAcc >= 240 && knifeAngle < -100) {
				//Kill
				kill.play();
				heartBeat.play();
				currentUpdater = successKill;
			} else {
				//Fail
				hurt.play();
				currentUpdater = failKill;
			}
		}
	}
	
	function keyPress(ev) {
		switch (ev.charCode) {
			//D
			case 100:
				if (lastKeyPressed === 97) {
					accumulator = 0;
					powerAcc += 15;
				} else { powerAcc -= 5; }
				break;
			//A
			case 97:
				if (lastKeyPressed === 100) {
					accumulator = 0;
					powerAcc += 15;
				} else { powerAcc -= 5;	}
				break;
		}
		
		if (powerAcc < 0) { powerAcc = 0; }
		if (powerAcc > 300) { powerAcc = 270; }
		
		lastKeyPressed = ev.charCode;
	}
	
	this.update = function(delta) {
		accTimer += delta;
		if (accTimer >= 1) {
			accTimer = 0;
			timerValue -= 1;
			if (timerValue <= 0) {
				clearInterval(intervalId);
			}
		}
		currentUpdater(delta);
		
		var currentTime = new Date().getTime() / 500;
		var annoyngMeter = points;
		var annoyingQuotient = annoyngMeter / 100;
		var annoyngSin = Math.sin(currentTime * annoyingQuotient * 10 * 1 + Math.random() * annoyingQuotient * 1);
		var annoyngCos = Math.cos(currentTime * annoyingQuotient * 10 * 0.8 + Math.random() * annoyingQuotient * 1);
		
		shakeX = annoyngCos * 600 * annoyingQuotient;
		shakeY = annoyngSin * 600 * annoyingQuotient;
		
		knifeX = x + knifeOffsetX + shakeX;
		knifeY = y + knifeOffsetY + shakeY;
		
		var angleX = x + shakeX;
		var angleY = y + shakeY;
		
		knifeAngle =  -120 + (((angleX -220) * (angleX - 220)) +  ((angleY - 100) * (angleY - 100))) * + 0.01;
		
		if (knifeAngle >  0) {
			knifeAngle = -0;
		} 
		
	}
	
	this.draw = function(context) {
		context.drawImage(sacrificied, sacX, sacY);
		
		if (showBlood) {
			context.drawImage(bloodShot, sacX + 10, sacY + 5);
			context.drawImage(heart, heartX, heartY, 50, 65);
		}
		
		context.save();
			context.translate(knifeX, knifeY);
			context.rotate(_global_DegreeToRadians(knifeAngle));
			context.translate(-knifeX, -knifeY);
			context.drawImage(knife, knifeX, knifeY);
		context.restore();
		
		context.drawImage(powerBar, 0, 0, powerAcc, 10,
			10, 189, powerAcc, 10);
			
		for (var i = 0; i < points; i++) {
			context.drawImage(heart, (12 * i) + 10, 10, 25, 25);
		}
		
		context.fillText(points, (points * 12) + 8, 25);
		
		drawTimer(context);
		drawInstructions(context);
	}
	
	function drawTimer(context) {
		context.drawImage(clock, 420, 2, 200, 200);
	
		context.save();
			context.fillStyle = "rgb(255,0,0)";
			context.font = "38pt arial";
			context.fillText(timerValue, 490, 120);
		context.restore();
	}
	
	function drawInstructions(context) {
		context.save();
			context.fillStyle = "rgb(0,0,0)";
			context.strokeStyle = "rgb(255,255,255)";
			context.font = "11pt arial";
			context.strokeText("Use A and D to energy the knife", 410, 160);
			context.strokeText("Click to stab", 410, 175);
			context.strokeText("Collect hearts before the time's up!", 410, 190);
			context.fillText("Use A and D to energy the knife", 410, 160);
			context.fillText("Click to stab", 410, 175);
			context.fillText("Collect hearts before the time's up!", 410, 190);
		context.restore();
	}
	
	function normalUpdate(delta) {
		powerAcc -= levelFriction;
		if (powerAcc < 0) { powerAcc = 15; }
		if (powerAcc > 300) { powerAcc = 270; }
	}
	
	var bringStatus = 0;
	var staticAcce = 10;
	var counterBring = 0;
	var gravedad = 2;
	var acceIni = staticAcce;
	
	function bringNewBody(delta) {
		counterBring += delta;
		if (counterBring >= 0.05) {
			counterBring = 0;
			switch (bringStatus) {
				case 0:
					sacY -= acceIni;
					acceIni -= gravedad;
					sacX -= 10;
					
					if (sacX < -100) {
						selectRandomImage();
						bringStatus++;
						sacX = 10;
						sacY = 300;
					}
					break;
				case 1:
					sacX += 10;
					sacY -= 10;
					if (sacX > 195 && sacX < 210) {
						sacX = 200;
						sacY = 80;
						showMouseEnabled = true;
						currentUpdater = normalUpdate;
						bringStatus = 0;
					}
					break;
			}
		}
		
		/*sacX -= 15.2;
		
		if (sacX < -40) {
			selectRandomImage();
			sacX = 680;
		}
		
		if (sacX > 205 && sacX < 220) {
			sacX = 200;
			showMouseEnabled = true;
			currentUpdater = normalUpdate;
		}*/
	}
	
	var successCounter = 0;
	
	var doBloodBath = bloodBath;
	
	function bloodBath(){
		fwk.add(new BloodSplash());
	};
	
	function successKill(delta) {
		showMouseEnabled = false;
		successCounter += delta;
	
		doBloodBath();
		doBloodBath = function() {};
	
		showBlood = true;
		
		knifeOffsetX -= 5;
		knifeOffsetY += 10;
		knifeX -= 5;
		knifeY += 10;
		heartY -= 0.2;
		
		if (knifeOffsetX < -30) {
			knifeOffsetX = 0;
			knifeOffsetY = 0;
		
			successCounter = 0;
			timerValue += 2;
			heartY = 70;
			showBlood = false;
			
			points++;
			levelFriction += 0.5  * 3 / (3 + points);
			
			currentUpdater = bringNewBody;
			acceIni = staticAcce;
			doBloodBath = bloodBath;
		}
	}
	
	function failKill(delta) {
		showMouseEnabled = false;
		
		knifeOffsetX -= 5;
		knifeOffsetY += 10;
		knifeX -= 5;
		knifeY += 10;
				
		if (knifeOffsetX < -30) {
			knifeOffsetX = 0;
			knifeOffsetY = 0;
			
			timerValue -= 2;
			if (timerValue < 0)	{
				timerValue = 0;
			}
			points--;
			levelFriction -= 0.5;
			
			if (levelFriction < 0) { levelFriction = 0; }
			if (points < 0) { 
				points = 0; 
			}
			
			showMouseEnabled = true;
			currentUpdater = normalUpdate;
		}
	}
	
	var currentUpdater = function () {};
	
	this.zOrder = 100;
	this.visible = true;
}

function Background() {
	var escena = new Image();
	var templo = new Image();
	escena.src = "graphics/escena.png";
	templo.src = "graphics/templo.png";

	this.visible = true;
	
	this.init = function() {}
	
	this.update = function (delta) {}
	
	this.draw = function (context) {
		context.drawImage(escena, 0,0, 640, 200);
		context.drawImage(templo, -10, 120, 390, 190);
	}
	
	this.zOrder = 1;
}

function BloodSplash() {
	var splash = new Image();
	
	function loadBaths() {
		var pictureBag = [];
		for (var i = 0; i < 4; i++) {
			var s = new Image();
			s.src = "graphics/bloodSplash" + i + ".png";
			pictureBag.push(s);
		}
		var selected = Math.floor(Math.random() * pictureBag.length);
		splash = pictureBag[selected];
	}
	
	loadBaths();
	
	var x;
	var y;

	this.visible = true;
	
	this.init = function() {
		x = (Math.random() * 150) + 130;
		y = (Math.random() * 20) + 100;
	}
	
	this.update = function (delta) {
	}
	
	this.draw = function (context) {
		context.drawImage(splash, x, y);
	}
	
	this.zOrder = 2;
}