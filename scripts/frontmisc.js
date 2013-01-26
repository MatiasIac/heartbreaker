function FrontMisc() {
	var self = this;
	
	var luz1 = new Image();
	luz1.src = "graphics/luz1.png";
	
	var luz2 = new Image();
	luz2.src = "graphics/luz2.png";
	
	var luz3 = new Image();
	luz3.src = "graphics/luz3.png";
	
	var gato = new Image();
	gato.src = "graphics/gato2.png";

	this.zOrder = 100;
	
	this.init = function() {}
	
	this.visible = true;
	
	this.update = function(delta) {
	}
	
	this.draw = function(context) {
		context.drawImage(luz1, 20, 450);
		context.drawImage(luz2, 330, 450);
		context.drawImage(gato, 680, 550);
		context.drawImage(luz3, 650, 450);
	}
}