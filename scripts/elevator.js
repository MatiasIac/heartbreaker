
function Elevator(floors) {
	var self = this;
	var totalFloors = floors;
	var actualFloor = 0;
	
	var sprite = new Image();
	sprite.src = "elevatorlight.png";
	
	var drawingPointer = function (context) {};
	
	this.moveTo = function (floor) {
	}
	
	this.init = function() {
	}
	
	this.update = function(delta) {
	}
	
	this.draw = function(context) {
		drawingPointer(context);
	}
	
	function iddle(context) {
		for (var i = 0; i < floor.lenght; i++) {
			if (i === actualFloor) {
				context.drawImage(sprite, 216, 0, 36, 35,
					floor[i].x, floor[i].y, 36, 35);
			} else {
				context.drawImage(sprite, 0, 0, 36, 35,
					floor[i].x, floor[i].y, 36, 35);
			}
		}
	}
	
	this.zOrder = 100;
	this.visible = true;
}