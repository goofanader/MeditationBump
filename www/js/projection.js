function Projection(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
}

Projection.prototype = Object.create(Actor.prototype);

Projection.prototype.constructor = Actor

Projection.prototype.update = function() {
	// Updating acceleration every tick based on spring & damper physics
	//acceleration = (-SPRING_CONSTANT*distanceFromCenter - DAMPING*velocity)/mass;
	super.update()
}