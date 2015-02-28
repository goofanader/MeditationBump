function Desire(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
}

Desire.prototype = Object.create(Actor.prototype);

Desire.prototype.constructor = Actor

Desire.prototype.update = function() {
	// Updating acceleration every tick based on gravity
	toCenter = monk.position.nonImmuteSub(position);
	a_magnitude = GRAVITY * monk.mass / (Math.pow(toCenter.magnitude,2));
	acceleration = toCenter.norm.scale(a_magnitude);
	super.update();
}