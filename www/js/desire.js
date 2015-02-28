function Desire(pos, vel, mass, radius) {
	Actor.call(this, pos, vel, mass, radius);
}

Desire.prototype = Object.create(Actor.prototype);

Desire.prototype.constructor = Actor

Desire.prototype.update = function() {
	// Updating acceleration every tick based on gravity
	//acceleration = GRAVITY * monk.mass / (distanceFromMonk^2);
	super.update()
}