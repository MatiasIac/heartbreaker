function Misc() {
	var self = this;
	
	var street = new Image();
	street.src = "graphics/bereda.png";

	var xStreet = 0;
	var yStreet = 520;
	
	this.zOrder = 0;
	
	this.init = function() {}
	
	this.visible = true;
	
	this.update = function(delta) {
	}
	
	this.draw = function(context) {
		context.drawImage(street, xStreet, yStreet);
	}
}