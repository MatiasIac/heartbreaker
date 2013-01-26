function MinFwkGame() {

	var canvas;
	var context;
	var backBuffer;
	var gameObjects;
	var self = this;
	var objectToBeAdded = new Array();
	var objectToDeleted = new Array();
	var console = document.getElementById("console");

	this.init = function (canvasName) {
		canvas = document.getElementById(canvasName);
		context = canvas.getContext("2d");
		
		backBufferCanvas = document.createElement('canvas');
		backBufferCanvas.width = canvas.width;
		backBufferCanvas.height = canvas.height;
		backBuffer = backBufferCanvas.getContext('2d');
		
		gameObjects = new Array();
	
		setInterval(runGame, 1000 / 30);
	}

	this.add = function (obj) {
		objectToBeAdded.push(obj);
	};
		
	this.remove = function (obj) {
		objectToDeleted.push(obj);
	};
	
	this.removeAll = function() {
		for (var i = 0; i < gameObjects.length; i++) {
			self.remove(gameObjects[i]);
		}	
	};

	function processAll() {
		//Added
		if (objectToBeAdded.length != 0) {
			for (var x = 0; x < objectToBeAdded.length; ++x) {
				gameObjects.push(objectToBeAdded[x]);
				if (objectToBeAdded[x].init) {
					objectToBeAdded[x].init();
				}
			}
			objectToBeAdded.splice(0, objectToBeAdded.length);
		}
		
		//Remove
		if (objectToDeleted.length != 0)
		{
			for (var x = 0; x < objectToDeleted.length; ++x) {
				gameObjects.removeObject(objectToDeleted[x]);
			}
			objectToDeleted.splice(0, objectToDeleted.length);
		}
		self.sortObjects();
	}

	function runGame() {
		var thisFrame = new Date().getTime();
		var delta = (thisFrame - this.lastFrame) / 1000;
		this.lastFrame = thisFrame;
		
		backBuffer.fillStyle = "rgb(0,0,0)";
		backBuffer.fillRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < gameObjects.length; i++) {
			gameObjects[i].update(delta);
			if (gameObjects[i].draw && gameObjects[i].visible) {
				gameObjects[i].draw(backBuffer);
			}
		}
		
		context.drawImage(backBufferCanvas, 0, 0);
		
		processAll();
	};

	this.sortObjects = function() {
		gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;});
	}
	
	/* Mouse functions */
	var isMouseRegistered = false;
	var mouseCallers = [];
	
	this.registerMouseClick = function (func) {
		if (!isMouseRegistered) {
			canvas.addEventListener("click", mouseClick, false);
			isMouseRegistered = true;
		}
		
		mouseCallers.push(func);
	}
	
	this.unregisterMouseClick = function () {
		canvas.removeEventListener("click", mouseClick, false);
		mouseCallers = [];
	}
	
	this.console = new function (){
		this.write = function (text) {
			console.innerHTML = text;
		}
		
		this.append = function (text) {
			console.innerHTML += "<br>" + text;
		}
		
		this.clear = function() {
			console.innerHTML = "";
		}
	};
	
	function mouseClick(e) {
		var x;
		var y;
		
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		} else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		
		for (var i = 0; i < mouseCallers.length; i++) {
			mouseCallers[i](x, y);
		}
	}
	/* End mouse func */
	
	/* Keyboard functions */
	var isKeyboardRegistered = false;
	var keyboardCallers = [];
	
	this.registerKeyPress = function (func) {
		if (!isKeyboardRegistered) {
			document.addEventListener("keypress", keyPress , false);
			isKeyboardRegistered = true;
		}
		
		keyboardCallers.push(func);
	}
	
	this.unregisterKeyPress = function (func) {
		document.removeEventListener("keypress", keyPress , false);
		keyboardCallers = [];
	}
	
	function keyPress(e) {
		e.preventDefault();
		for (var i = 0; i < keyboardCallers.length; i++) {
			keyboardCallers[i](e.charCode);
		}
	}
	/* End keyboard functions */
}