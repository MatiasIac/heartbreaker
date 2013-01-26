function Elevator(floors) {
	var self = this;
	var theFloors = floors;
	var totalFloors = floors.length;
	var actualFloor = 0;
	var movingTo = 0;
	var counter = 0;
	
	var sprite = new Image();
	sprite.src = "graphics/elevatorlight.png";
	
	var drawingPointer = function (context) {};
	var updatingPointer = function (delta) {};
	
	this.elevatorArrive = function (floor) {};
	
	this.moveTo = function (floorNumber) {
		movingTo = floorNumber;
		drawingPointer = movingDrawing;
		updatingPointer = movingUpdater;
	}
	
	this.init = function() {
		drawingPointer = idleDrawing;
		updatingPointer = idleUpdater;
	}
	
	this.update = function(delta) {
		updatingPointer(delta);
	}
	
	this.draw = function(context) {
		drawingPointer(context);
	}
	
	var frameMoving = 6;
	
	function movingUpdater(delta) {
		counter += delta;
		if (counter >= 0.1) {
			counter = 0;
		
			if (actualFloor === movingTo && 
				(frameMoving === 5 || frameMoving === 7)) {
				frameMoving = 6;
				drawingPointer = idleDrawing;
				updatingPointer = idleUpdater;
				self.elevatorArrive(actualFloor);
			} else if (actualFloor < movingTo) {
				if (frameMoving === 0 && actualFloor !== movingTo) {
					actualFloor++;
					frameMoving++;
				} else {
					frameMoving++;
					if (frameMoving === 11) {
						frameMoving = 0;
					}
				}
			} else if (actualFloor > movingTo){
				if (frameMoving === 0 && actualFloor !== movingTo) {
					actualFloor--;
					frameMoving = 11;
				} else {
					frameMoving--;
				}
			} else {
				frameMoving += frameMoving < 6 ? 1 : -1;
			}
		}
	}
	
	function movingDrawing(context) {
		for (var i = 0; i < theFloors.length; i++) {
			if (i === actualFloor) {
				context.drawImage(sprite, frameMoving * 36, 0, 36, 35,
					theFloors[i].x, theFloors[i].y, 36, 35);
			} else {
				context.drawImage(sprite, 0, 0, 36, 35,
					theFloors[i].x, theFloors[i].y, 36, 35);
			}
		}
	}
	
	function idleUpdater(delta) {	}
	
	function idleDrawing(context) {
		for (var i = 0; i < theFloors.length; i++) {
			if (i === actualFloor) {
				context.drawImage(sprite, 216, 0, 36, 35,
					theFloors[i].x, theFloors[i].y, 36, 35);
			} else {
				context.drawImage(sprite, 0, 0, 36, 35,
					theFloors[i].x, theFloors[i].y, 36, 35);
			}
		}
	}
	
	this.zOrder = 1000;
	this.visible = true;
}