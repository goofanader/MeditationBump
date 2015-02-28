function Desire(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
}

Desire.prototype = Object.create(Actor.prototype);

Desire.prototype.constructor = Actor

Desire.prototype.update = function() {
	// Updating acceleration every tick based on gravity
	var toCenter = monk.position.nonImmuteSub(position);
	var a_magnitude = GRAVITY * monk.mass / (Math.pow(toCenter.magnitude,2));
	var acceleration = toCenter.norm.scale(a_magnitude);
	super.update();
}