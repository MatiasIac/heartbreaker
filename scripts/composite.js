function Composite() {
	var self = this;
	var components = [];
	this.visible = true;
	
	this.add = function(obj) {
		components.push(obj);
		obj.init();
	}
	
	this.get = function(i) {
		return components[i];
	};
	
	this.getComponents = function() {
		return components;
	}
	
	this.count = function () {
		return components.length;
	};
	
	this.update = function(delta) {				
		for (var index in components) {
			components[index].update(delta);
		}
	}
	
	this.draw = function(context) {
		for (var index in components) {
			if (components[index].visible) {
				components[index].draw(context);
			}			
		}
	}
}